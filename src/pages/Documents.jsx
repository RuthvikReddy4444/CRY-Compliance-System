import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

const documents = [
  {
    id: "DOC-001",
    name: "Registration Certificate",
    partner: "Sunrise Foundation",
    partnerId: "NGO-002",
    type: "NGO",
    submitted: "12 Aug 2026",
    expiry: "12 Aug 2027",
    status: "Verified",
  },
  {
    id: "DOC-002",
    name: "Annual Financial Report",
    partner: "Sunrise Foundation",
    partnerId: "NGO-002",
    type: "NGO",
    submitted: "10 Aug 2026",
    expiry: "10 Aug 2027",
    status: "Pending Review",
  },
  {
    id: "DOC-003",
    name: "Child Protection Policy",
    partner: "Rural Child Care Initiative",
    partnerId: "NGO-001",
    type: "NGO",
    submitted: "08 Aug 2026",
    expiry: "08 Aug 2027",
    status: "Rejected",
  },
  {
    id: "DOC-004",
    name: "SHG Registration",
    partner: "Helping Hands SHG",
    partnerId: "SHG-001",
    type: "SHG",
    submitted: "05 Aug 2026",
    expiry: "05 Aug 2027",
    status: "Verified",
  },
  {
    id: "DOC-005",
    name: "Bank Account Statement",
    partner: "Helping Hands SHG",
    partnerId: "SHG-001",
    type: "SHG",
    submitted: "03 Aug 2026",
    expiry: "03 Sep 2026",
    status: "Pending Review",
  },
  {
    id: "DOC-006",
    name: "Board Member Declaration",
    partner: "Sunrise Foundation",
    partnerId: "NGO-002",
    type: "NGO",
    submitted: "01 Aug 2026",
    expiry: "01 Aug 2027",
    status: "Verified",
  },
];

function Documents() {
  const [searchParams] = useSearchParams();

  const partnerId = searchParams.get("partner");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const filteredDocuments = useMemo(() => {
    return documents.filter((document) => {
      const searchMatch =
        document.name.toLowerCase().includes(search.toLowerCase()) ||
        document.partner.toLowerCase().includes(search.toLowerCase()) ||
        document.partnerId.toLowerCase().includes(search.toLowerCase());

      const statusMatch =
        statusFilter === "All Status" ||
        document.status === statusFilter;

      const typeMatch =
        typeFilter === "All Types" ||
        document.type === typeFilter;

      const partnerMatch =
        !partnerId || document.partnerId === partnerId;

      return (
        searchMatch &&
        statusMatch &&
        typeMatch &&
        partnerMatch
      );
    });
  }, [search, statusFilter, typeFilter, partnerId]);

  const totalDocuments = filteredDocuments.length;

  const verifiedCount = filteredDocuments.filter(
    (document) => document.status === "Verified"
  ).length;

  const pendingCount = filteredDocuments.filter(
    (document) => document.status === "Pending Review"
  ).length;

  const rejectedCount = filteredDocuments.filter(
    (document) => document.status === "Rejected"
  ).length;

  const selectedPartner =
    filteredDocuments.length > 0
      ? filteredDocuments[0].partner
      : null;

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Document Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Partner Documents
          </h1>

          <p className="mt-2 text-slate-500">
            Review NGO and SHG documents and track verification status.
          </p>
        </div>

        {/* Selected Partner */}
        {partnerId && selectedPartner && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Viewing Partner
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-900">
                {selectedPartner}
              </span>

              <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {partnerId}
              </span>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total Documents
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalDocuments}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Verified
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {verifiedCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Pending Review
            </p>

            <p className="mt-2 text-3xl font-bold text-amber-600">
              {pendingCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {rejectedCount}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Search */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search documents
              </label>

              <input
                type="text"
                placeholder="Search by document or partner..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Status</option>
                <option>Verified</option>
                <option>Pending Review</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Partner Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Partner Type
              </label>

              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Types</option>
                <option>NGO</option>
                <option>SHG</option>
              </select>
            </div>

          </div>

          <div className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredDocuments.length}
            </span>{" "}
            documents
          </div>

        </div>

        {/* Document Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Document Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Documents submitted by registered NGO and SHG partners.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200 text-left">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Document
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Partner
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Submitted
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Expiry
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredDocuments.map((document) => (

                  <tr
                    key={document.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {document.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {document.id}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <p className="font-medium text-slate-800">
                        {document.partner}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {document.partnerId}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                        {document.type}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {document.submitted}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-600">
                      {document.expiry}
                    </td>

                    <td className="px-6 py-5">

                      {document.status === "Verified" && (
                        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                          Verified
                        </span>
                      )}

                      {document.status === "Pending Review" && (
                        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                          Pending Review
                        </span>
                      )}

                      {document.status === "Rejected" && (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          Rejected
                        </span>
                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-semibold text-slate-800">
                No documents found
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

export default Documents;