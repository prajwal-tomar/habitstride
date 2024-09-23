export function RecentActivity() {
  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const activities = [
    { id: 1, description: 'Completed Morning Workout', timestamp: '2 hours ago' },
    { id: 2, description: 'Started new habit: Meditate', timestamp: '1 day ago' },
    { id: 3, description: 'Achieved 7-day streak in Reading', timestamp: '3 days ago' },
  ];

  return (
    <ul className="space-y-4">
      {activities.map((activity) => (
        <li key={activity.id} className="text-sm">
          <p>{activity.description}</p>
          <p className="text-gray-500">{activity.timestamp}</p>
        </li>
      ))}
    </ul>
  );
}