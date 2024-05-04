export const Weather = ({ city, unit }) => {
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Weather</h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl font-bold">18</span>
          <span className="text-4xl font-bold">°C</span>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Sunny</p>
        </div>
      </div>
    </div>
  );
};
