import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";

const alertsData = [
  {
    id: "ALT-001",
    title: "Document Expiring Soon",
    partner: "Sunrise Foundation",
    partnerId: "NGO-002",
    type: "Document Expiry",
    severity: "Medium",
    date: "20 Aug 2026",
    message: "Registration Certificate expires within 30 days.",
    status: "Open",
  },
  {
    id: "ALT-002",
    title: "Low Compliance Score",
    partner: "Hope for Children",
    partnerId: "NGO-003",
    type: "Compliance",
    severity: "High",
    date: "19 Aug 2026",
    message: "Compliance score has fallen below 50%.",
    status: "Open",
  },
  {
    id: "ALT-003",
    title: "Document Rejected",
    partner: "Rural Child Care Initiative",
    partnerId: "NGO-001",
    type: "Document Review",
    severity: "High",
    date: "18 Aug 2026",
    message: "Child Protection Policy was rejected during scrutiny.",
    status: "Open",
  },
  {
    id: "ALT-004",
    title: "Pending Verification",
    partner: "Helping Hands SHG",
    partnerId: "SHG-001",
    type: "Verification",
    severity: "Medium",
    date: "17 Aug 2026",
    message: "Two documents are still waiting for verification.",
    status: "Open",
  },
  {
    id: "ALT-005",
    title: "Compliance Review Completed",
    partner: "Women Empowerment SHG",
    partnerId: "SHG-002",
    type: "Compliance",
    severity: "Low",
    date: "16 Aug 2026",
    message: "Compliance review has been successfully completed.",
    status: "Resolved",
  },
];

function Alerts() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All Severity");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filteredAlerts = useMemo(() => {
    return alertsData.filter((alert) => {
      const searchMatch =
        alert.title.toLowerCase().includes(search.toLowerCase()) ||
        alert.partner.toLowerCase().includes(search.toLowerCase()) ||
        alert.partnerId.toLowerCase().includes(search.toLowerCase()) ||
        alert.type.toLowerCase().includes(search.toLowerCase());

      const severityMatch =
        severityFilter === "All Severity" ||
        alert.severity === severityFilter;

      const statusMatch =
        statusFilter === "All Status" ||
        alert.status === statusFilter;

      return searchMatch && severityMatch && statusMatch;
    });
  }, [search, severityFilter, statusFilter]);

  const openCount = alertsData.filter(
    (alert) => alert.status === "Open"
  ).length;

  const highCount = alertsData.filter(
    (alert) => alert.severity === "High"
  ).length;

  const mediumCount = alertsData.filter(
    (alert) => alert.severity === "Medium"
  ).length;

  const resolvedCount = alertsData.filter(
    (alert) => alert.status === "Resolved"
  ).length;

  const severityClass = (severity) => {
    if (severity === "High") {
      return "bg-red-50 text-red-700";
    }

    if (severity === "Medium") {
      return "bg-amber-50 text-amber-700";
    }

    return "bg-emerald-50 text-emerald-700";
  };

  const statusClass = (status) => {
    if (status === "Open") {
      return "bg-red-50 text-red-700";
    }

    return "bg-emerald-50 text-emerald-700";
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Compliance Monitoring
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Alerts & Notifications
          </h1>

          <p className="mt-2 text-slate-500">
            Review compliance issues, document warnings and partner alerts.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Open Alerts
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {openCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              High Priority
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {highCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Medium Priority
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {mediumCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {resolvedCount}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search alerts
              </label>

              <input
                type="text"
                placeholder="Search alerts or partners..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Severity
              </label>

              <select
                value={severityFilter}
                onChange={(event) =>
                  setSeverityFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
              >
                <option>All Severity</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none"
              >
                <option>All Status</option>
                <option>Open</option>
                <option>Resolved</option>
              </select>
            </div>

          </div>

          <p className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredAlerts.length}
            </span>{" "}
            alerts
          </p>

        </div>

        {/* Alerts List */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Alert Center
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Issues requiring monitoring or follow-up.
            </p>
          </div>

          <div>

            {filteredAlerts.map((alert) => (

              <div
                key={alert.id}
                className="border-b border-slate-100 px-6 py-6 last:border-b-0 hover:bg-slate-50"
              >

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                  <div className="flex gap-4">

                    {/* Alert Icon */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        alert.severity === "High"
                          ? "bg-red-50"
                          : alert.severity === "Medium"
                          ? "bg-amber-50"
                          : "bg-emerald-50"
                      }`}
                    >
                      <span className="text-lg">
                        {alert.severity === "High"
                          ? "!"
                          : alert.severity === "Medium"
                          ? "!"
                          : "✓"}
                      </span>
                    </div>

                    <div>

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-slate-900">
                          {alert.title}
                        </h3>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${severityClass(
                            alert.severity
                          )}`}
                        >
                          {alert.severity}
                        </span>

                      </div>

                      <p className="mt-1 text-sm text-slate-500">
                        {alert.message}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">

                        <span>
                          Partner:{" "}
                          <span className="font-medium text-slate-600">
                            {alert.partner}
                          </span>
                        </span>

                        <span>
                          ID:{" "}
                          <span className="font-medium text-slate-600">
                            {alert.partnerId}
                          </span>
                        </span>

                        <span>
                          Type:{" "}
                          <span className="font-medium text-slate-600">
                            {alert.type}
                          </span>
                        </span>

                        <span>{alert.date}</span>

                      </div>

                    </div>

                  </div>

                  <div className="flex shrink-0 items-center">

                    <span
                      className={`rounded-full px-4 py-2 text-xs font-semibold ${statusClass(
                        alert.status
                      )}`}
                    >
                      {alert.status}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filteredAlerts.length === 0 && (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-semibold text-slate-800">
                No alerts found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>

      </div>
    </PageContainer>
  );
}

export default Alerts;