import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { SerpAPILoader } from '@langchain/community/document_loaders/web/serpapi'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { Document } from 'langchain/document'
import { LangChainAdapter, StreamingTextResponse } from 'ai'

export const summarize = async (input: string, webResults) => {
  // Initialize the necessary components
  const llm = new ChatOpenAI({ model: 'gpt-4', temperature: 0 })
  const embeddings = new OpenAIEmbeddings()

  // create Document from web search results
  const webResultDocuments = webResults.map(
    result =>
      new Document({
        pageContent: JSON.stringify(result),
        metadata: { type: result.type }
      })
  )

  // Use MemoryVectorStore to store the loaded documents in memory
  const vectorStore = await MemoryVectorStore.fromDocuments(
    webResultDocuments,
    embeddings
  )

  const questionAnsweringPrompt = ChatPromptTemplate.fromMessages([
    [
      'system',
      "Answer the user's questions based on the below context:\n\n{context}"
    ],
    ['human', '{input}']
  ])

  const combineDocsChain = await createStuffDocumentsChain({
    llm,
    prompt: questionAnsweringPrompt
  })

  const chain = await createRetrievalChain({
    retriever: vectorStore.asRetriever(),
    combineDocsChain
  })

  const stream = await chain.stream({
    input
  })

  return stream
}
