function StatisticsCard({ title, value, icon, color = "text-blue-600" }) {
    return (
      <div className="bg-zinc-900 shadow-lg rounded-lg p-6 flex items-center">
        <div className={`text-4xl ${color} mr-4`}>{icon}</div>
        <div>
          <h2 className="text-lg font-semibold mb-1 text-gray-300">{title}</h2>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
      </div>
    );
  }

  export default StatisticsCard;