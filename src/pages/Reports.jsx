import { useState } from "react";
import PageContainer from "../components/layout/PageContainer";

const reports = [
  {
    id: "RPT-001",
    name: "Monthly Compliance Report",
    type: "Compliance",
    period: "August 2026",
    generated: "20 Aug 2026",
    status: "Ready",
  },
  {
    id: "RPT-002",
    name: "Partner Performance Report",
    type: "Partner",
    period: "August 2026",
    generated: "19 Aug 2026",
    status: "Ready",
  },
  {
    id: "RPT-003",
    name: "Document Verification Report",
    type: "Documents",
    period: "August 2026",
    generated: "18 Aug 2026",
    status: "Ready",
  },
  {
    id: "RPT-004",
    name: "High Risk Partner Report",
    type: "Risk",
    period: "August 2026",
    generated: "17 Aug 2026",
    status: "Ready",
  },
  {
    id: "RPT-005",
    name: "Scrutiny Summary Report",
    type: "Scrutiny",
    period: "August 2026",
    generated: "16 Aug 2026",
    status: "Ready",
  },
];

function Reports() {
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredReports =
    typeFilter === "All Types"
      ? reports
      : reports.filter((report) => report.type === typeFilter);

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Reporting & Analytics
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Generate and review compliance, partner and document reports.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Reports
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              24
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Compliance Reports
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              8
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Partner Reports
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              7
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Risk Reports
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              5
            </p>
          </div>

        </div>

        {/* Generate Report */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Generate Report
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create a new report for compliance monitoring.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <select
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm"
              >
                <option>Compliance Report</option>
                <option>Partner Report</option>
                <option>Document Report</option>
                <option>Risk Report</option>
                <option>Scrutiny Report</option>
              </select>

              <button
                className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                onClick={() =>
                  alert("Report generation started.")
                }
              >
                Generate Report
              </button>

            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Report Type
              </label>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className="rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
              >
                <option>All Types</option>
                <option>Compliance</option>
                <option>Partner</option>
                <option>Documents</option>
                <option>Risk</option>
                <option>Scrutiny</option>
              </select>
            </div>

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-900">
                {filteredReports.length}
              </span>{" "}
              reports
            </p>

          </div>

        </div>

        {/* Report Directory */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Report Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Previously generated compliance reports.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">
                <tr className="border-b border-slate-200 text-left">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Report
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Period
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Generated
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody>

                {filteredReports.map((report) => (

                  <tr
                    key={report.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {report.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {report.id}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        {report.type}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {report.period}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {report.generated}
                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                        {report.status}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          alert(`Opening ${report.name}`)
                        }
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                      >
                        View
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </PageContainer>
  );
}

export default Reports;