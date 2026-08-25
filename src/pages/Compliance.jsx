import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";

const complianceData = [
  {
    id: "NGO-001",
    name: "Rural Child Care Initiative",
    type: "NGO",
    location: "Odisha",
    score: 64,
    status: "Needs Attention",
    documents: 12,
    verified: 8,
    pending: 3,
    rejected: 1,
  },
  {
    id: "NGO-002",
    name: "Sunrise Foundation",
    type: "NGO",
    location: "Telangana",
    score: 92,
    status: "Compliant",
    documents: 15,
    verified: 14,
    pending: 1,
    rejected: 0,
  },
  {
    id: "SHG-001",
    name: "Helping Hands SHG",
    type: "SHG",
    location: "Karnataka",
    score: 71,
    status: "Needs Attention",
    documents: 10,
    verified: 7,
    pending: 2,
    rejected: 1,
  },
  {
    id: "NGO-003",
    name: "Hope for Children",
    type: "NGO",
    location: "Maharashtra",
    score: 48,
    status: "High Risk",
    documents: 14,
    verified: 6,
    pending: 4,
    rejected: 4,
  },
  {
    id: "SHG-002",
    name: "Women Empowerment SHG",
    type: "SHG",
    location: "Andhra Pradesh",
    score: 86,
    status: "Compliant",
    documents: 11,
    verified: 10,
    pending: 1,
    rejected: 0,
  },
];

function Compliance() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredPartners = useMemo(() => {
    return complianceData.filter((partner) => {
      const searchMatch =
        partner.name.toLowerCase().includes(search.toLowerCase()) ||
        partner.id.toLowerCase().includes(search.toLowerCase()) ||
        partner.location.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" ||
        partner.status === statusFilter;

      const typeMatch =
        typeFilter === "All Types" ||
        partner.type === typeFilter;

      return searchMatch && statusMatch && typeMatch;
    });
  }, [search, statusFilter, typeFilter]);

  const compliantCount = complianceData.filter(
    (partner) => partner.status === "Compliant"
  ).length;

  const attentionCount = complianceData.filter(
    (partner) => partner.status === "Needs Attention"
  ).length;

  const highRiskCount = complianceData.filter(
    (partner) => partner.status === "High Risk"
  ).length;

  const averageScore = Math.round(
    complianceData.reduce((total, partner) => total + partner.score, 0) /
      complianceData.length
  );

  const getScoreText = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  const getProgressColor = (score) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-red-500";
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
            Compliance Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Monitor compliance scores and identify partners requiring attention.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Average Compliance
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {averageScore}%
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Compliant
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {compliantCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Partners meeting requirements
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Needs Attention
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {attentionCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Partners requiring follow-up
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              High Risk
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {highRiskCount}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Immediate attention required
            </p>
          </div>

        </div>

        {/* Compliance Health */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Overall Compliance Health
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Current compliance performance across tracked partners.
            </p>
          </div>

          <div className="flex items-center gap-5">

            <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-slate-200">

              <span className="text-xl font-bold text-slate-900">
                {averageScore}%
              </span>

            </div>

            <div className="flex-1">

              <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-slate-700">
                  Compliance score
                </span>

                <span className="font-semibold text-slate-900">
                  {averageScore}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-slate-900 transition-all"
                  style={{ width: `${averageScore}%` }}
                />

              </div>

              <div className="mt-3 flex gap-5 text-xs text-slate-500">

                <span>
                  <span className="font-semibold text-emerald-600">
                    {compliantCount}
                  </span>{" "}
                  Compliant
                </span>

                <span>
                  <span className="font-semibold text-amber-600">
                    {attentionCount}
                  </span>{" "}
                  Attention
                </span>

                <span>
                  <span className="font-semibold text-red-600">
                    {highRiskCount}
                  </span>{" "}
                  High Risk
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search partners
              </label>

              <input
                type="text"
                placeholder="Search by name, ID or location..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Status</option>
                <option>Compliant</option>
                <option>Needs Attention</option>
                <option>High Risk</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Partner Type
              </label>

              <select
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Types</option>
                <option>NGO</option>
                <option>SHG</option>
              </select>
            </div>

          </div>

          <p className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredPartners.length}
            </span>{" "}
            partners
          </p>

        </div>

        {/* Partner Compliance Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="text-lg font-semibold text-slate-900">
              Partner Compliance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compliance scores calculated from document verification results.
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200 text-left">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Partner
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Documents
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Compliance Score
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredPartners.map((partner) => (

                  <tr
                    key={partner.id}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {partner.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {partner.id} · {partner.location}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {partner.type}
                      </span>

                    </td>

                    <td className="px-6 py-5">

                      <p className="text-sm font-semibold text-slate-800">
                        {partner.documents}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {partner.verified} verified · {partner.pending} pending
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <div className="w-48">

                        <div className="mb-2 flex justify-between">

                          <span
                            className={`text-sm font-bold ${getScoreText(
                              partner.score
                            )}`}
                          >
                            {partner.score}%
                          </span>

                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                          <div
                            className={`h-full rounded-full ${getProgressColor(
                              partner.score
                            )}`}
                            style={{
                              width: `${partner.score}%`,
                            }}
                          />

                        </div>

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      {partner.status === "Compliant" && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          Compliant
                        </span>
                      )}

                      {partner.status === "Needs Attention" && (
                        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                          Needs Attention
                        </span>
                      )}

                      {partner.status === "High Risk" && (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          High Risk
                        </span>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredPartners.length === 0 && (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-semibold text-slate-800">
                No partners found
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

export default Compliance;