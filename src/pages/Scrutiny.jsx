import { useMemo, useState } from "react";
import PageContainer from "../components/layout/PageContainer";

const scrutinyItems = [
  {
    id: "SCR-001",
    documentId: "DOC-002",
    document: "Annual Financial Report",
    partner: "Sunrise Foundation",
    partnerId: "NGO-002",
    type: "NGO",
    issue: "Financial verification required",
    priority: "Medium",
    status: "Pending Review",
    submitted: "10 Aug 2026",
  },
  {
    id: "SCR-002",
    documentId: "DOC-003",
    document: "Child Protection Policy",
    partner: "Rural Child Care Initiative",
    partnerId: "NGO-001",
    type: "NGO",
    issue: "Required information is missing",
    priority: "High",
    status: "Rejected",
    submitted: "08 Aug 2026",
  },
  {
    id: "SCR-003",
    documentId: "DOC-005",
    document: "Bank Account Statement",
    partner: "Helping Hands SHG",
    partnerId: "SHG-001",
    type: "SHG",
    issue: "Bank details need verification",
    priority: "Medium",
    status: "Pending Review",
    submitted: "03 Aug 2026",
  },
  {
    id: "SCR-004",
    documentId: "DOC-007",
    document: "FCRA Registration",
    partner: "Hope for Children",
    partnerId: "NGO-003",
    type: "NGO",
    issue: "Registration validity check",
    priority: "High",
    status: "Pending Review",
    submitted: "01 Aug 2026",
  },
  {
    id: "SCR-005",
    documentId: "DOC-008",
    document: "Annual Activity Report",
    partner: "Women Empowerment SHG",
    partnerId: "SHG-002",
    type: "SHG",
    issue: "Activity details need confirmation",
    priority: "Low",
    status: "Pending Review",
    submitted: "29 Jul 2026",
  },
];

function Scrutiny() {
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All Priority");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [selectedItem, setSelectedItem] = useState(null);

  const [reviewStatus, setReviewStatus] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const filteredItems = useMemo(() => {
    return scrutinyItems.filter((item) => {
      const searchMatch =
        item.document.toLowerCase().includes(search.toLowerCase()) ||
        item.partner.toLowerCase().includes(search.toLowerCase()) ||
        item.partnerId.toLowerCase().includes(search.toLowerCase());

      const priorityMatch =
        priorityFilter === "All Priority" ||
        item.priority === priorityFilter;

      const statusMatch =
        statusFilter === "All Status" ||
        item.status === statusFilter;

      return searchMatch && priorityMatch && statusMatch;
    });
  }, [search, priorityFilter, statusFilter]);

  const pendingCount = scrutinyItems.filter(
    (item) => item.status === "Pending Review"
  ).length;

  const highPriorityCount = scrutinyItems.filter(
    (item) => item.priority === "High"
  ).length;

  const rejectedCount = scrutinyItems.filter(
    (item) => item.status === "Rejected"
  ).length;

  const handleReview = (item) => {
    setSelectedItem(item);
    setReviewStatus("");
    setReviewComment("");
  };

  const handleSubmitReview = () => {
    if (!reviewStatus) {
      alert("Please select a review decision.");
      return;
    }

    alert(
      `Review submitted for ${selectedItem.document}\nDecision: ${reviewStatus}`
    );

    setSelectedItem(null);
    setReviewStatus("");
    setReviewComment("");
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Document Review
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Scrutiny Queue
          </h1>

          <p className="mt-2 text-slate-500">
            Review submitted NGO and SHG documents and identify compliance issues.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

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
              High Priority
            </p>

            <p className="mt-2 text-3xl font-bold text-red-600">
              {highPriorityCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Rejected
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {rejectedCount}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Queue Size
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {filteredItems.length}
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-3">

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Search
              </label>

              <input
                type="text"
                placeholder="Search document or partner..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Priority
              </label>

              <select
                value={priorityFilter}
                onChange={(event) =>
                  setPriorityFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Priority</option>
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
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
              >
                <option>All Status</option>
                <option>Pending Review</option>
                <option>Rejected</option>
              </select>
            </div>

          </div>

          <p className="mt-4 text-sm text-slate-500">
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredItems.length}
            </span>{" "}
            scrutiny items
          </p>

        </div>

        {/* Scrutiny Queue */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Review Queue
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Documents requiring compliance officer attention.
            </p>
          </div>

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200 text-left">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Document
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Partner
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Issue
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Priority
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

                {filteredItems.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-100 transition hover:bg-slate-50"
                  >

                    <td className="px-6 py-5">

                      <p className="font-semibold text-slate-900">
                        {item.document}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.documentId}
                      </p>

                    </td>

                    <td className="px-6 py-5">

                      <p className="font-medium text-slate-800">
                        {item.partner}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {item.partnerId}
                      </p>

                    </td>

                    <td className="max-w-xs px-6 py-5 text-sm text-slate-600">
                      {item.issue}
                    </td>

                    <td className="px-6 py-5">

                      {item.priority === "High" && (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          High
                        </span>
                      )}

                      {item.priority === "Medium" && (
                        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                          Medium
                        </span>
                      )}

                      {item.priority === "Low" && (
                        <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                          Low
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5">

                      {item.status === "Pending Review" && (
                        <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                          Pending Review
                        </span>
                      )}

                      {item.status === "Rejected" && (
                        <span className="rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          Rejected
                        </span>
                      )}

                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() => handleReview(item)}
                        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        Review
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {filteredItems.length === 0 && (
            <div className="px-6 py-16 text-center">

              <p className="text-lg font-semibold text-slate-800">
                No scrutiny items found
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or filters.
              </p>

            </div>
          )}

        </div>

      </div>

      {/* Review Modal */}
      {selectedItem && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

            <div className="border-b border-slate-200 px-6 py-5">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Document Review
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-slate-900">
                    {selectedItem.document}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedItem.partner} · {selectedItem.partnerId}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-2xl text-slate-400 hover:text-slate-900"
                >
                  ×
                </button>

              </div>

            </div>

            <div className="space-y-5 px-6 py-6">

              {/* Document information */}
              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm font-semibold text-slate-900">
                  Scrutiny Finding
                </p>

                <p className="mt-2 text-sm text-slate-600">
                  {selectedItem.issue}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-slate-400">
                      Priority
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedItem.priority}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Submitted
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      {selectedItem.submitted}
                    </p>
                  </div>

                </div>

              </div>

              {/* Decision */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Review Decision
                </label>

                <select
                  value={reviewStatus}
                  onChange={(event) =>
                    setReviewStatus(event.target.value)
                  }
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-slate-900"
                >

                  <option value="">
                    Select decision
                  </option>

                  <option value="Approved">
                    Approve Document
                  </option>

                  <option value="Rejected">
                    Reject Document
                  </option>

                  <option value="Correction Required">
                    Request Correction
                  </option>

                </select>

              </div>

              {/* Comments */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-800">
                  Reviewer Comments
                </label>

                <textarea
                  rows="4"
                  value={reviewComment}
                  onChange={(event) =>
                    setReviewComment(event.target.value)
                  }
                  placeholder="Enter your observations or reason for the decision..."
                  className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900"
                />

              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">

              <button
                onClick={() => setSelectedItem(null)}
                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmitReview}
                className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-700"
              >
                Submit Review
              </button>

            </div>

          </div>

        </div>

      )}

    </PageContainer>
  );
}

export default Scrutiny;