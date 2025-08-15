# BharatVerse Development Plan

## Project Overview
Building an open-source Twitter alternative specifically designed for the Indian audience using Next.js, TypeScript, and shadcn/ui.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Icons**: Lucide React
- **Package Manager**: npm (for accessibility)

## Design System
- **Primary Color**: Saffron (#FF9933)
- **Secondary Color**: Deep Teal (#008080)
- **Font**: System fonts
- **Border Radius**: 0.5rem
- **Spacing**: 4px grid system

## Architecture

### Folder Structure
```
bharatverse/
├── app/                     # Next.js app directory
│   ├── (auth)/
│   │   └── login/          # Login page
│   ├── (main)/
│   │   ├── feed/           # Feed page
│   │   ├── profile/        # Profile page
│   │   ├── notifications/  # Notifications
│   │   └── explore/        # Search/Explore
│   ├── layout.tsx
│   └── globals.css
├── features/               # Feature modules
│   ├── auth/
│   ├── feed/
│   ├── posts/
│   ├── profile/
│   ├── notifications/
│   └── search/
├── components/             # Shared components
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components
│   └── common/            # Common components
├── lib/                   # Utilities
├── hooks/                 # Custom hooks
├── store/                 # Global state
├── types/                 # TypeScript types
├── public/                # Static assets
├── server/                # Backend placeholder
└── docs/                  # Documentation
```

## Implementation Tasks

### ✅ Completed
1. Initialize Next.js project with TypeScript and Tailwind CSS
2. Set up shadcn/ui components library

### 🔄 In Progress
3. Create feature-based folder structure

### 📋 Pending
4. Implement login page with dummy authentication
5. Create Twitter-like feed page with mock posts
6. Build post creation component
7. Implement user profile page
8. Create notifications page
9. Build search/explore page
10. Implement responsive navigation (sidebar/mobile)
11. Set up Zustand for state management
12. Create comprehensive README.md
13. Add CONTRIBUTING.md and documentation
14. Set up backend folder structure with placeholders
15. Configure ESLint and Prettier

## Pages to Implement

### 1. Login Page (`/login`)
- Clean, modern design
- Email and password fields
- Login button that redirects to feed
- Indian color theme (saffron & teal)
- Mobile responsive

### 2. Feed Page (`/feed`)
- Twitter-like infinite scroll
- Post cards with:
  - User avatar
  - Username and handle
  - Post content
  - Like, comment, repost actions
  - Timestamp
- Post creation box at top
- Trending sidebar (desktop only)
- Mobile optimized

### 3. Profile Page (`/profile/[username]`)
- User header with:
  - Cover image
  - Avatar
  - Name, handle, bio
  - Follow/Edit button
  - Stats (posts, followers, following)
- Tabs for Posts/Replies/Likes
- Post list below

### 4. Notifications Page (`/notifications`)
- List of notifications
- Types: mentions, likes, reposts, follows
- Mark as read functionality
- Filter options

### 5. Search/Explore Page (`/explore`)
- Search bar at top
- Trending topics
- Suggested users to follow
- Popular posts

## Components to Build

### Layout Components
- `Sidebar.tsx` - Desktop navigation sidebar
- `MobileNav.tsx` - Mobile bottom navigation
- `Header.tsx` - Top header with logo

### Feature Components
- `PostCard.tsx` - Individual post display
- `PostCreator.tsx` - Create new post
- `UserCard.tsx` - User profile card
- `TrendingCard.tsx` - Trending topic card
- `NotificationItem.tsx` - Single notification

### UI Components (via shadcn/ui)
- Button
- Card
- Avatar
- Input
- Textarea
- Dialog/Modal
- Tabs
- ScrollArea
- Skeleton

## State Management (Zustand)
```typescript
// stores/authStore.ts
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string) => void;
  logout: () => void;
}

// stores/feedStore.ts
interface FeedState {
  posts: Post[];
  loading: boolean;
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
}
```

## Mock Data Structure
```typescript
interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
}

interface Post {
  id: string;
  content: string;
  author: User;
  likes: number;
  comments: number;
  reposts: number;
  timestamp: Date;
  isLiked?: boolean;
}
```

## Development Workflow
1. Create feature folder structure
2. Implement authentication flow (dummy)
3. Build feed page with mock data
4. Add post creation functionality
5. Implement profile pages
6. Add notifications
7. Create search/explore
8. Implement responsive navigation
9. Add state management
10. Write documentation
11. Set up contribution guidelines

## Commands
```bash
# Development
npm run dev

# Build
npm run build

# Start production
npm start

# Type check
npm run type-check

# Lint
npm run lint
```

## Open Source Priorities
1. **Clear Documentation**: Every feature has README
2. **Simple Setup**: One command to start developing
3. **Mock Data**: No backend required initially
4. **TypeScript**: Better developer experience
5. **Component Isolation**: Each feature is independent
6. **Contribution Guidelines**: Clear path for contributors
7. **Issue Templates**: Structured problem reporting
8. **PR Templates**: Consistent contribution format

## Next Steps
1. Complete folder structure setup
2. Build login page UI
3. Implement feed page with mock posts
4. Add navigation components
5. Create remaining pages
6. Add state management
7. Write comprehensive documentation

## Notes
- Using npm instead of pnpm for wider accessibility
- Feature-based architecture for better modularity
- Mock data first, real API later
- Mobile-first responsive design
- Indian color theme throughout
- Focus on UI/UX before backend integration