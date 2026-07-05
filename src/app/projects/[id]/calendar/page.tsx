"use client";

import { useParams } from "next/navigation";
import { useMemo } from "react";

type Visit = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  time: string;
  createdAt: string;
  status?: string;
};

type EmptyMonthDay = {
  key: string;
  isEmpty: true;
};

type FilledMonthDay = {
  key: string;
  isEmpty: false;
  dayNumber: number;
  isToday: boolean;
  visitCount: number;
};

export default function ProjectCalendarPage() {
  const params = useParams<{ id: string }>();
  const isLoaded = typeof window !== "undefined";
  const currentDate = useMemo(() => {
    if (!isLoaded) {
      return null;
    }

    return new Date();
  }, [isLoaded]);
  const visits = useMemo<Visit[]>(() => {
    if (!isLoaded) {
      return [];
    }

    const savedVisits = localStorage.getItem(
      `soft-premium-system.projects.${params.id}.visits`,
    );
    const parsedVisits: Visit[] = savedVisits ? JSON.parse(savedVisits) : [];

    return [...parsedVisits].sort((firstVisit, secondVisit) => {
      const firstDateTime = `${firstVisit.date}T${firstVisit.time}`;
      const secondDateTime = `${secondVisit.date}T${secondVisit.time}`;

      return firstDateTime.localeCompare(secondDateTime);
    });
  }, [isLoaded, params.id]);
  const monthLabel = useMemo(() => {
    if (!currentDate) {
      return "";
    }

    return currentDate.toLocaleDateString(undefined, {
      month: "long",
      year: "numeric",
    });
  }, [currentDate]);
  const weekdayLabels = useMemo(() => {
    if (!currentDate) {
      return [];
    }

    const sunday = new Date(2026, 6, 5);

    return Array.from({ length: 7 }, (_, index) =>
      new Date(sunday.getFullYear(), sunday.getMonth(), sunday.getDate() + index)
        .toLocaleDateString(undefined, { weekday: "short" }),
    );
  }, [currentDate]);
  const monthDays = useMemo<Array<EmptyMonthDay | FilledMonthDay>>(() => {
    if (!currentDate) {
      return [];
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      currentDate.getDate(),
    ).padStart(2, "0")}`;
    const visitCountByDay = visits.reduce<Record<string, number>>((counts, visit) => {
      const [visitYear, visitMonth] = visit.date.split("-").map(Number);

      if (visitYear === year && visitMonth === month + 1) {
        counts[visit.date] = (counts[visit.date] ?? 0) + 1;
      }

      return counts;
    }, {});

    const emptyDays: EmptyMonthDay[] = Array.from(
      { length: firstDayOfMonth.getDay() },
      (_, index) => ({
        key: `empty-${index}`,
        isEmpty: true,
      }),
    );
    const filledDays: FilledMonthDay[] = Array.from(
      { length: daysInMonth },
      (_, index) => {
        const dayNumber = index + 1;
        const dayKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          dayNumber,
        ).padStart(2, "0")}`;

        return {
          key: dayKey,
          isEmpty: false,
          dayNumber,
          isToday: dayKey === todayKey,
          visitCount: visitCountByDay[dayKey] ?? 0,
        };
      },
    );

    return [...emptyDays, ...filledDays];
  }, [currentDate, visits]);

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-zinc-50">Calendar</h2>
          <p className="text-zinc-400">Project Scheduling Workspace</p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              {"<"}
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              Today
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800"
            >
              {">"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Day
            </button>
            <button
              type="button"
              className="rounded-full border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100"
            >
              Week
            </button>
            <button
              type="button"
              className="rounded-full bg-white px-4 py-2 text-sm font-medium text-zinc-950"
            >
              Month
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
                Workspace
              </p>
              <h3 className="text-xl font-semibold text-zinc-50">Month View</h3>
              <p className="text-zinc-400">{monthLabel}</p>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-center text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {monthDays.map((day) =>
                day.isEmpty ? (
                  <div
                    key={day.key}
                    className="min-h-28 rounded-xl border border-dashed border-zinc-800 bg-zinc-950/40"
                  />
                ) : (
                  <div
                    key={day.key}
                    className={`min-h-28 rounded-xl border p-3 ${
                      day.isToday
                        ? "border-zinc-500 bg-zinc-900"
                        : "border-zinc-800 bg-zinc-950/60"
                    }`}
                  >
                    <div className="flex h-full flex-col justify-between gap-3">
                      <p
                        className={`text-sm font-medium ${
                          day.isToday ? "text-zinc-50" : "text-zinc-300"
                        }`}
                      >
                        {day.dayNumber}
                      </p>

                      {day.visitCount > 0 ? (
                        <div className="self-start rounded-full border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-200">
                          ● {day.visitCount}{" "}
                          {day.visitCount === 1 ? "visit" : "visits"}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ),
              )}
            </div>

            <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
              Scheduling items
            </p>
            <p className="text-sm text-zinc-500">
              {isLoaded
                ? `${visits.length} scheduling items available in this project.`
                : null}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
