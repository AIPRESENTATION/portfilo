const StatCard = ({ label, value, icon: Icon, color = 'blue' }) => {
  const colors = {
    blue: 'from-blue-500/10 to-blue-500/5 text-blue-600 dark:from-blue-500/20 dark:to-blue-500/10 dark:text-blue-400',
    purple: 'from-purple-500/10 to-purple-500/5 text-purple-600 dark:from-purple-500/20 dark:to-purple-500/10 dark:text-purple-400',
    green: 'from-emerald-500/10 to-emerald-500/5 text-emerald-600 dark:from-emerald-500/20 dark:to-emerald-500/10 dark:text-emerald-400',
    orange: 'from-orange-500/10 to-orange-500/5 text-orange-600 dark:from-orange-500/20 dark:to-orange-500/10 dark:text-orange-400',
  };

  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-blue-600">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        {Icon && (
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110 ${colors[color]}`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
