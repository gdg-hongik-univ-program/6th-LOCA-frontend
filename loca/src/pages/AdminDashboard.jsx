import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppShell } from "@/src/components/layout/AppShell";
import { getPlaces } from "@/src/services/placeService";
import { getTags } from "@/src/services/tagService";

const DASHBOARD_CARDS = [
  {
    key: "places",
    label: "장소 관리",
    metricLabel: "등록된 장소",
    path: "/admin/places",
  },
  {
    key: "tags",
    label: "태그 관리",
    metricLabel: "등록된 태그",
    path: "/admin/tags",
  },
];

function LoadingState() {
  return (
    <AppShell>
      <div className="w-full md:pl-8 py-10 text-zinc-500">불러오는 중...</div>
    </AppShell>
  );
}

function DashboardCard({ count, label, metricLabel, path }) {
  return (
    <Link className="rounded-2xl bg-white p-6 shadow-[0_10px_28px_rgba(24,24,27,0.08)]" to={path}>
      <p className="text-lg font-extrabold">{label}</p>
      <p className="mt-4 text-sm font-semibold text-zinc-500">{metricLabel}</p>
      <p className="mt-2 text-3xl font-extrabold">{count}</p>
    </Link>
  );
}

export default function AdminPage() {
  const [places, setPlaces] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getPlaces(), getTags()]).then(([placesData, tagsData]) => {
      setPlaces(placesData);
      setTags(tagsData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  const counts = {
    places: places.length,
    tags: tags.length,
  };

  return (
    <AppShell>
      <div className="w-full md:pl-8">
        <h1 className="text-2xl font-extrabold md:text-3xl">Admin Dashboard</h1>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {DASHBOARD_CARDS.map((card) => (
            <DashboardCard count={counts[card.key]} key={card.key} {...card} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
