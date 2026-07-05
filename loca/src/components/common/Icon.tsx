type IconProps = {
  name:
    | "home"
    | "search"
    | "plus"
    | "bookmark"
    | "user"
    | "bell"
    | "settings"
    | "heart"
    | "sliders"
    | "star"
    | "mapPin"
    | "clock"
    | "share"
    | "x"
    | "chevron"
    | "users"
    | "camera";
  className?: string;
  filled?: boolean;
};

const paths: Record<IconProps["name"], string[]> = {
  home: ["M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3V10.5Z"],
  search: ["M10.8 18.6a7.8 7.8 0 1 1 0-15.6 7.8 7.8 0 0 1 0 15.6Z", "M16.5 16.5 21 21"],
  plus: ["M12 5v14", "M5 12h14"],
  bookmark: ["M6 4h12v17l-6-3.6L6 21V4Z"],
  user: ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z", "M4 21a8 8 0 0 1 16 0"],
  bell: ["M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z", "M10 21h4"],
  settings: ["M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z", "M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 3h-5l-.3 3.1a7 7 0 0 0-1.7 1l-2.4-1-2 3.4 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 3.1h5l.3-3.1a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.5c.1-.3.1-.7.1-1Z"],
  heart: ["M20.8 8.2c0 5-8.8 10.3-8.8 10.3S3.2 13.2 3.2 8.2A4.7 4.7 0 0 1 12 5.9a4.7 4.7 0 0 1 8.8 2.3Z"],
  sliders: ["M4 7h10", "M18 7h2", "M4 17h2", "M10 17h10", "M14 5v4", "M8 15v4"],
  star: ["M12 3.5 14.7 9l6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9l6.1-.9L12 3.5Z"],
  mapPin: ["M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z", "M12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  clock: ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z", "M12 7v5l3 2"],
  share: ["M18 8a3 3 0 1 0-2.8-4", "M6 15a3 3 0 1 0 2.8 4", "M8.7 8.7l6.6-3.4", "M8.7 15.3l6.6 3.4"],
  x: ["M6 6l12 12", "M18 6 6 18"],
  chevron: ["M9 18l6-6-6-6"],
  users: ["M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M17 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M2.5 20a5.5 5.5 0 0 1 11 0", "M12.5 20a5.5 5.5 0 0 1 9 0"],
  camera: ["M4 8h4l1.5-2h5L16 8h4v11H4V8Z", "M12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"],
};

export function Icon({ name, className = "h-5 w-5", filled = false }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      {paths[name].map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
