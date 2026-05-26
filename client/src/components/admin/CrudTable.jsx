import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const CrudTable = ({ columns, data, onEdit, onDelete, emptyMessage = 'No items yet' }) => {
  if (!data?.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-200 bg-white p-12 text-center text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 font-semibold text-slate-700">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row._id} className="border-b border-slate-50 hover:bg-slate-50/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-slate-600">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onEdit(row)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-accent-blue"
                      aria-label="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(row._id)}
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      aria-label="Delete"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CrudTable;
