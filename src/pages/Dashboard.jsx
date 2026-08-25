import { useNavigate } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";

const stats = [
  {
    title: "Total Partners",
    value: "128",
    description: "NGOs & SHGs",
    color: "text-slate-900",
  },
  {
    title: "Compliant",
    value: "86",
    description: "67.2% of partners",
    color: "text-emerald-600",
  },
  {
    title: "Needs Attention",
    value: "27",
    description: "Requires review",
    color: "text-amber-600",
  },
  {
    title: "High Risk",
    value: "15",
    description: "Immediate action",
    color: "text-red-600",
  },
];

const alerts = [
  {
    title: "Document expiry approaching",
    partner: "Sunrise Foundation",
    type: "Warning",
    time: "2 hours ago",
  },
  {
    title: "Annual audit report pending",
    partner: "Community Child Support Trust",
    type: "Review",
    time: "5 hours ago",
  },
  {
    title: "Compliance score dropped below 60%",
    partner: "Women for Children SHG",
    type: "High Risk",
    time: "Yesterday",
  },
];

function Dashboard() {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            CRY Compliance Platform
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Compliance Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Monitor NGO and SHG documentation, scrutiny and compliance.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
{stats.map((stat) => (
  <div
  key={stat.title}
  onClick={() => {
    if (stat.title === "Total Partners") {
      navigate("/partners");
    }

    if (stat.title === "Compliant") {
      navigate("/partners?status=Compliant");
    }

    if (stat.title === "Needs Attention") {
      navigate("/partners?status=Needs%20Attention");
    }

    if (stat.title === "High Risk") {
      navigate("/partners?status=High%20Risk");
    }
  }}
  className="cursor-pointer rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
>
              <p className="text-sm font-medium text-slate-500">
                {stat.title}
              </p>

              <p
                className={`mt-3 text-3xl font-bold ${stat.color}`}
              >
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          ))}

        </div>

        {/* Main compliance section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Overall Compliance */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Overall Compliance
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current compliance across all tracked partners.
              </p>
            </div>

            <div className="mt-8">

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-sm text-slate-500">
                    Compliance score
                  </p>

                  <p className="mt-2 text-4xl font-bold text-slate-900">
                    78%
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-slate-400">
                    Target
                  </p>

                  <p className="text-sm font-semibold text-slate-700">
                    85%
                  </p>
                </div>

              </div>

              <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-100">

                <div
                  className="h-full rounded-full bg-slate-900"
                  style={{ width: "78%" }}
                />

              </div>

              <div className="mt-3 flex justify-between text-xs text-slate-400">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>

            </div>

          </div>

          {/* Document Review */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Document Review
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Current document processing status.
              </p>
            </div>

            <div className="mt-8 space-y-6">

              <DocumentStatus
                label="Verified"
                value="842"
                color="text-emerald-600"
                barColor="bg-emerald-500"
                width="84%"
              />

              <DocumentStatus
                label="Pending Review"
                value="117"
                color="text-amber-600"
                barColor="bg-amber-500"
                width="12%"
              />

              <DocumentStatus
                label="Rejected"
                value="38"
                color="text-red-600"
                barColor="bg-red-500"
                width="4%"
              />

            </div>

          </div>

        </div>

        {/* Lower section */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          {/* Compliance by Partner Type */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">

            <h2 className="text-lg font-semibold text-slate-900">
              Compliance by Partner Type
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Compare current compliance across NGOs and SHGs.
            </p>

            <div className="mt-8 space-y-7">

              <ComplianceBar
                label="NGOs"
                value="82%"
                width="82%"
              />

              <ComplianceBar
                label="SHGs"
                value="70%"
                width="70%"
              />

            </div>

          </div>

          {/* Recent Alerts */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-200 p-6">

              <h2 className="text-lg font-semibold text-slate-900">
                Recent Alerts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Items requiring attention from compliance officers.
              </p>

            </div>

            <div className="divide-y divide-slate-100">

              {alerts.map((alert) => (
                <div
                  key={alert.title}
                  className="p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {alert.title}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {alert.partner}
                      </p>
                    </div>

                    <AlertBadge type={alert.type} />

                  </div>

                  <p className="mt-3 text-xs text-slate-400">
                    {alert.time}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

        {/* Bottom summary */}
        <div className="mt-6 mb-8 rounded-xl border border-slate-200 bg-slate-900 p-6 text-white">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <p className="text-sm font-medium text-slate-300">
                Compliance Officer Workspace
              </p>

              <h2 className="mt-1 text-xl font-semibold">
                15 partners require immediate attention
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Review high-risk partners and resolve outstanding
                documentation issues.
              </p>
            </div>

            <button className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
              Review High Risk
            </button>

          </div>

        </div>

      </div>
    </PageContainer>
  );
}

function DocumentStatus({
  label,
  value,
  color,
  barColor,
  width,
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-slate-600">
          {label}
        </span>

        <span className={`text-sm font-bold ${color}`}>
          {value}
        </span>

      </div>

      <div className="mt-2 h-2 rounded-full bg-slate-100">

        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width }}
        />

      </div>

    </div>
  );
}

function ComplianceBar({
  label,
  value,
  width,
}) {
  return (
    <div>

      <div className="flex items-center justify-between">

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>

        <span className="text-sm font-semibold text-slate-900">
          {value}
        </span>

      </div>

      <div className="mt-3 h-3 rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-slate-900"
          style={{ width }}
        />

      </div>

    </div>
  );
}

function AlertBadge({ type }) {
  const styles = {
    Warning: "bg-amber-50 text-amber-700",
    Review: "bg-blue-50 text-blue-700",
    "High Risk": "bg-red-50 text-red-700",
  };

  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${
        styles[type]
      }`}
    >
      {type}
    </span>
  );
}

export default Dashboard;