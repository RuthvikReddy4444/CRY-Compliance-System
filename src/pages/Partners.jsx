import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

function Partners() {
  const [searchParams] = useSearchParams();
  const statusFromDashboard = searchParams.get("status");
  const navigate = useNavigate();

  // =========================
  // State
  // =========================

  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] =
    useState("All Locations");

  // =========================
  // Fetch Partners
  // =========================

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/partners"
        );

        if (!response.ok) {
          throw new Error(
            `Server returned ${response.status}`
          );
        }

        const result = await response.json();

        console.log("Partners API response:", result);

        if (!result.success) {
          throw new Error("Failed to fetch partners");
        }

        setPartners(
          Array.isArray(result.data)
            ? result.data
            : []
        );
      } catch (err) {
        console.error("Partner fetch error:", err);

        setError(
          "Unable to load partners. Please make sure the backend server is running."
        );

        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  // =========================
  // Normalize MongoDB Data
  // =========================

  const normalizedPartners = useMemo(() => {
    return partners.map((partner) => {
      const partnerId = partner.partnerId || "";

      // Determine type from partner ID
      let type = "Other";

      if (partnerId.startsWith("NGO-")) {
        type = "NGO";
      } else if (partnerId.startsWith("SHG-")) {
        type = "SHG";
      }

      // Compliance display based on risk level
      let compliance = null;

      if (partner.riskLevel === "Low") {
        compliance = 90;
      } else if (partner.riskLevel === "Medium") {
        compliance = 70;
      } else if (partner.riskLevel === "High") {
        compliance = 40;
      }

      return {
        ...partner,

        id: partner.partnerId || partner._id,

        name:
          partner.name ||
          partner.organization ||
          "Unknown Partner",

        type,

        location:
          partner.location ||
          "Not specified",

        status:
          partner.status ||
          "Pending",

        category:
          partner.category ||
          "Not specified",

        riskLevel:
          partner.riskLevel ||
          "Unknown",

        documents: 0,

        compliance,
      };
    });
  }, [partners]);

  // =========================
  // Dynamic Locations
  // =========================

  const locations = useMemo(() => {
    const uniqueLocations = [
      ...new Set(
        normalizedPartners
          .map((partner) => partner.location)
          .filter(Boolean)
      ),
    ];

    return uniqueLocations;
  }, [normalizedPartners]);

  // =========================
  // Dynamic Statuses
  // =========================

  const statuses = useMemo(() => {
    const uniqueStatuses = [
      ...new Set(
        normalizedPartners
          .map((partner) => partner.status)
          .filter(Boolean)
      ),
    ];

    return uniqueStatuses;
  }, [normalizedPartners]);

  // =========================
  // Filter Partners
  // =========================

  const filteredPartners = useMemo(() => {
    return normalizedPartners.filter((partner) => {
      const searchText = search.toLowerCase();

      const searchMatch =
        partner.name
          .toLowerCase()
          .includes(searchText) ||
        partner.id
          .toLowerCase()
          .includes(searchText) ||
        partner.organization
          ?.toLowerCase()
          .includes(searchText) ||
        partner.category
          ?.toLowerCase()
          .includes(searchText);

      const typeMatch =
        typeFilter === "All Types" ||
        partner.type === typeFilter;

      const statusMatch = statusFromDashboard
        ? partner.status === statusFromDashboard
        : statusFilter === "All Status" ||
          partner.status === statusFilter;

      const locationMatch =
        locationFilter === "All Locations" ||
        partner.location === locationFilter;

      return (
        searchMatch &&
        typeMatch &&
        statusMatch &&
        locationMatch
      );
    });
  }, [
    normalizedPartners,
    search,
    typeFilter,
    statusFilter,
    locationFilter,
    statusFromDashboard,
  ]);

  // =========================
  // Clear Filters
  // =========================

  function clearFilters() {
    setSearch("");
    setTypeFilter("All Types");
    setStatusFilter("All Status");
    setLocationFilter("All Locations");
  }

  // =========================
  // Summary
  // =========================

  const totalPartners = normalizedPartners.length;

  const totalNGOs = normalizedPartners.filter(
    (partner) => partner.type === "NGO"
  ).length;

  const totalSHGs = normalizedPartners.filter(
    (partner) => partner.type === "SHG"
  ).length;

  // =========================
  // Render
  // =========================

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Partner Management
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            NGO & SHG Partners
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Review partner organizations and monitor their
            compliance status.
          </p>
        </div>

        {/* Summary Cards */}

        <div className="mb-6 grid gap-4 md:grid-cols-3">

          <SummaryCard
            title="Total Partners"
            value={totalPartners}
          />

          <SummaryCard
            title="NGOs"
            value={totalNGOs}
          />

          <SummaryCard
            title="SHGs"
            value={totalSHGs}
          />

        </div>

        {/* Filters */}

        <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="grid gap-4 md:grid-cols-4">

            {/* Search */}

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search partners..."
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
            />

            {/* Type */}

            <select
              value={typeFilter}
              onChange={(event) =>
                setTypeFilter(event.target.value)
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option>All Types</option>
              <option>NGO</option>
              <option>SHG</option>
              <option>Other</option>
            </select>

            {/* Status */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option>All Status</option>

              {statuses.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            {/* Location */}

            <select
              value={locationFilter}
              onChange={(event) =>
                setLocationFilter(event.target.value)
              }
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option>All Locations</option>

              {locations.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

          </div>

          {/* Filter Information */}

          <div className="mt-4 flex items-center justify-between">

            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredPartners.length}
              </span>{" "}
              partner
              {filteredPartners.length !== 1 && "s"}
            </p>

            {(search ||
              typeFilter !== "All Types" ||
              statusFilter !== "All Status" ||
              locationFilter !== "All Locations") && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-sm font-medium text-slate-700 hover:text-slate-900"
              >
                Clear filters
              </button>
            )}

          </div>

        </div>

        {/* Partner Directory */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-6 py-5">

            <h2 className="font-semibold text-slate-900">
              Partner Directory
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Organizations currently registered in the
              compliance system.
            </p>

          </div>

          <div className="overflow-x-auto">

            {/* Loading */}

            {loading ? (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-700" />

                <p className="text-sm text-slate-500">
                  Loading partners...
                </p>

              </div>

            ) : error ? (

              /* Error */

              <div className="px-6 py-16 text-center">

                <p className="text-lg font-semibold text-red-600">
                  Unable to load partners
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  {error}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    window.location.reload()
                  }
                  className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Retry
                </button>

              </div>

            ) : filteredPartners.length > 0 ? (

              /* Table */

              <table className="w-full text-left">

                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Partner
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Type
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Risk Level
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredPartners.map((partner) => (

                    <tr
                      key={partner.id}
                      onClick={() =>
                        navigate(
                          `/partners/${partner.id}`
                        )
                      }
                      className="cursor-pointer transition hover:bg-slate-50"
                    >

                      {/* Partner */}

                      <td className="px-6 py-5">

                        <div>

                          <p className="font-semibold text-slate-900">
                            {partner.name}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {partner.id}
                          </p>

                        </div>

                      </td>

                      {/* Type */}

                      <td className="px-6 py-5">

                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {partner.type}
                        </span>

                      </td>

                      {/* Category */}

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {partner.category}
                      </td>

                      {/* Location */}

                      <td className="px-6 py-5 text-sm text-slate-600">
                        {partner.location}
                      </td>

                      {/* Risk */}

                      <td className="px-6 py-5">

                        <RiskBadge
                          riskLevel={partner.riskLevel}
                        />

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <StatusBadge
                          status={partner.status}
                        />

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            ) : (

              /* No Results */

              <div className="px-6 py-16 text-center">

                <p className="text-lg font-semibold text-slate-800">
                  No partners found
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
                >
                  Clear filters
                </button>

              </div>

            )}

          </div>

        </div>

      </div>
    </PageContainer>
  );
}

// =========================
// Summary Card
// =========================

function SummaryCard({ title, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-900">
        {value}
      </p>

    </div>
  );
}

// =========================
// Status Badge
// =========================

function StatusBadge({ status }) {
  const styles = {
    Active:
      "bg-blue-50 text-blue-700",

    Pending:
      "bg-amber-50 text-amber-700",

    Compliant:
      "bg-emerald-50 text-emerald-700",

    "Needs Attention":
      "bg-orange-50 text-orange-700",

    "High Risk":
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}

// =========================
// Risk Badge
// =========================

function RiskBadge({ riskLevel }) {
  const styles = {
    Low:
      "bg-emerald-50 text-emerald-700",

    Medium:
      "bg-amber-50 text-amber-700",

    High:
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
        styles[riskLevel] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {riskLevel}
    </span>
  );
}

export default Partners;