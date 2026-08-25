import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

const API_URL = "http://localhost:5000/api";

function PartnerDetails() {
  // IMPORTANT:
  // Your route is /partners/:partnerId
  const { partnerId } = useParams();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPartner = async () => {
      try {
        setLoading(true);
        setError("");

        console.log("Partner ID from URL:", partnerId);

        const response = await fetch(
          `${API_URL}/partners/${encodeURIComponent(partnerId)}`
        );

        console.log("Response status:", response.status);

        const result = await response.json();

        console.log("Partner API result:", result);

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load partner"
          );
        }

        setPartner(result.data);
      } catch (err) {
        console.error("Partner details error:", err);

        setError(
          err.message || "Failed to load partner details"
        );
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchPartner();
    } else {
      setLoading(false);
      setError("Partner ID is missing");
    }
  }, [partnerId]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-7xl">

          <Link
            to="/partners"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to Partners
          </Link>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">
              Loading partner...
            </p>
          </div>

        </div>
      </PageContainer>
    );
  }

  // --------------------------------------------------
  // ERROR / NOT FOUND
  // --------------------------------------------------

  if (error || !partner) {
    return (
      <PageContainer>
        <div className="mx-auto max-w-7xl">

          <Link
            to="/partners"
            className="text-sm font-medium text-slate-600 hover:text-slate-900"
          >
            ← Back to Partners
          </Link>

          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-16 text-center shadow-sm">

            <h1 className="text-3xl font-bold text-slate-900">
              Partner Not Found
            </h1>

            <p className="mt-3 text-slate-500">
              {error ||
                "The requested organization could not be found."}
            </p>

            <Link
              to="/partners"
              className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Back to Partners
            </Link>

          </div>
        </div>
      </PageContainer>
    );
  }

  // --------------------------------------------------
  // PARTNER DETAILS
  // --------------------------------------------------

  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Back Button */}
        <Link
          to="/partners"
          className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          ← Back to Partners
        </Link>

        {/* Header */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">

            <div>

              <p className="text-sm font-medium text-slate-500">
                Partner Details
              </p>

              <h1 className="mt-2 text-3xl font-bold text-slate-900">
                {partner.name}
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                {partner.partnerId}
              </p>

            </div>

            <StatusBadge status={partner.status} />

          </div>

        </div>

        {/* Information Cards */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Organization Information */}
          <DetailCard title="Organization Information">

            <DetailRow
              label="Partner ID"
              value={partner.partnerId}
            />

            <DetailRow
              label="Organization"
              value={partner.organization}
            />

            <DetailRow
              label="Category"
              value={partner.category}
            />

            <DetailRow
              label="Location"
              value={partner.location}
            />

          </DetailCard>

          {/* Contact Information */}
          <DetailCard title="Contact Information">

            <DetailRow
              label="Email"
              value={partner.email}
            />

            <DetailRow
              label="Phone"
              value={partner.phone}
            />

          </DetailCard>

          {/* Compliance Information */}
          <DetailCard title="Compliance Information">

            <DetailRow
              label="Status"
              value={partner.status}
            />

            <DetailRow
              label="Risk Level"
              value={partner.riskLevel}
            />

          </DetailCard>

          {/* System Information */}
          <DetailCard title="System Information">

            <DetailRow
              label="Created"
              value={
                partner.createdAt
                  ? new Date(
                      partner.createdAt
                    ).toLocaleString()
                  : "—"
              }
            />

            <DetailRow
              label="Last Updated"
              value={
                partner.updatedAt
                  ? new Date(
                      partner.updatedAt
                    ).toLocaleString()
                  : "—"
              }
            />

          </DetailCard>

        </div>

      </div>
    </PageContainer>
  );
}

// --------------------------------------------------
// DETAIL CARD
// --------------------------------------------------

function DetailCard({ title, children }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="border-b border-slate-100 pb-4 text-lg font-semibold text-slate-900">
        {title}
      </h2>

      <div className="mt-5 space-y-4">
        {children}
      </div>

    </div>
  );
}

// --------------------------------------------------
// DETAIL ROW
// --------------------------------------------------

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">

      <span className="text-sm text-slate-500">
        {label}
      </span>

      <span className="text-sm font-medium text-slate-800">
        {value || "—"}
      </span>

    </div>
  );
}

// --------------------------------------------------
// STATUS BADGE
// --------------------------------------------------

function StatusBadge({ status }) {

  const styles = {
    Active:
      "bg-emerald-50 text-emerald-700",

    Pending:
      "bg-amber-50 text-amber-700",

    Inactive:
      "bg-slate-100 text-slate-600",

    Compliant:
      "bg-emerald-50 text-emerald-700",

    "Needs Attention":
      "bg-amber-50 text-amber-700",

    "High Risk":
      "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
        styles[status] ||
        "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Unknown"}
    </span>
  );
}

export default PartnerDetails;