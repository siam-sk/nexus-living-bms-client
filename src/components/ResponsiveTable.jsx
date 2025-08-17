import React from 'react';

export default function ResponsiveTable({
  columns,
  data,
  rowKey,
  actionsHeader,
  renderActions,
  emptyMessage = 'No data found.',
}) {
  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
              {renderActions && <th>{actionsHeader || 'Actions'}</th>}
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((row, i) => (
                <tr key={rowKey(row, i)} className="hover">
                  {columns.map((col, cIdx) => (
                    <td key={cIdx}>
                      {typeof col.accessor === 'function' ? col.accessor(row, i) : row[col.accessor]}
                    </td>
                  ))}
                  {renderActions && <td className="space-x-2">{renderActions(row, i)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (renderActions ? 1 : 0)} className="text-center py-4">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden p-3">
        <div className="grid gap-3">
          {data?.length ? (
            data.map((row, i) => (
              <div key={rowKey(row, i)} className="rounded-xl border border-base-200 bg-base-100 p-4 shadow-sm">
                <div className="space-y-2">
                  {columns.map((col, cIdx) => (
                    <div key={cIdx} className="flex justify-between gap-3">
                      <span className="text-sm text-base-content/60">{col.header}</span>
                      <div className="text-right">
                        {typeof col.accessor === 'function' ? col.accessor(row, i) : row[col.accessor]}
                      </div>
                    </div>
                  ))}
                </div>
                {renderActions && <div className="mt-3 flex justify-end gap-2">{renderActions(row, i)}</div>}
              </div>
            ))
          ) : (
            <div className="text-center py-6">{emptyMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}