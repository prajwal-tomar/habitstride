# Database Structure for HabitStride

## 1. Users Table
- **Table Name:** `auth.users` (managed by Supabase Auth)
- This table is automatically handled by Supabase for user authentication and stores the following key information:

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Unique identifier for each user           |
  | `email`       | `TEXT`    | User's email address                      |
  | `created_at`  | `TIMESTAMP` | When the user was created                 |

  *Additional fields such as password are managed by Supabase.*

## 2. Profile Table
- **Table Name:** `profile`
- Stores additional user-related information after signup.

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Foreign key referencing `auth.users.id`   |
  | `username`    | `TEXT`    | The display name of the user              |
  | `avatar_url`  | `TEXT`    | URL of the user's profile picture         |
  | `bio`         | `TEXT`    | User's short bio                          |
  | `created_at`  | `TIMESTAMP` | Date the profile was created              |

## 3. Habits Table
- **Table Name:** `habits`
- Stores information about each habit the user is tracking.

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Unique identifier for the habit           |
  | `user_id`     | `UUID`    | Foreign key referencing `auth.users.id`   |
  | `habit_name`  | `TEXT`    | Name of the habit (e.g., "Exercise")      |
  | `goal`        | `TEXT`    | Target goal of the habit                  |
  | `created_at`  | `TIMESTAMP` | Date the habit was created                |

## 4. Habit Entries Table
- **Table Name:** `habit_entries`
- Stores daily habit logs, tracking whether the habit was completed on a specific day.

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Unique identifier for the entry           |
  | `habit_id`    | `UUID`    | Foreign key referencing `habits.id`       |
  | `entry_date`  | `DATE`    | The date of the habit entry               |
  | `status`      | `BOOLEAN` | Whether the habit was completed on that date (`TRUE` for completed, `FALSE` for not completed) |
  | `created_at`  | `TIMESTAMP` | Date the entry was created                |

## 5. Habit Streaks Table
- **Table Name:** `habit_streaks`
- Tracks consecutive days a habit was completed, useful for gamified habit streaks.

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Unique identifier for the streak entry    |
  | `habit_id`    | `UUID`    | Foreign key referencing `habits.id`       |
  | `streak_start_date` | `DATE` | The start date of the habit streak        |
  | `streak_end_date`   | `DATE` | The end date of the habit streak          |
  | `streak_length`     | `INTEGER` | Length of the streak in days             |

## 6. User Preferences Table
- **Table Name:** `preferences`
- Stores user-specific settings like notification preferences, color themes, etc.

  | Column        | Type      | Description                               |
  | ------------- | --------- | ----------------------------------------- |
  | `id`          | `UUID`    | Foreign key referencing `auth.users.id`   |
  | `reminder_time` | `TIME`  | Preferred time to receive habit reminders |
  | `theme`       | `TEXT`    | Selected UI theme (e.g., "dark" or "light") |
  | `created_at`  | `TIMESTAMP` | Date the preferences were set              |
