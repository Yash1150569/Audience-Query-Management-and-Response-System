import type { Agent, Query } from './types';

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Sarah Lee', avatarUrl: 'https://picsum.photos/seed/sarah/40/40', team: 'Tier 1 Support' },
  { id: 'agent-2', name: 'Mike Chen', avatarUrl: 'https://picsum.photos/seed/mike/40/40', team: 'Tier 1 Support' },
  { id: 'agent-3', name: 'David Kim', avatarUrl: 'https://picsum.photos/seed/david/40/40', team: 'Support Leads' },
  { id: 'agent-4', name: 'Jessica Brown', avatarUrl: 'https://picsum.photos/seed/jessica/40/40', team: 'Engineering' },
];

export const queries: Query[] = [
  {
    id: 'VR-84321',
    customer: { name: 'John Doe', avatarUrl: 'https://picsum.photos/seed/johndoe/40/40', email: 'john.d@example.com' },
    source: 'Email',
    content: "I can't log in to my account. I've tried resetting my password, but I'm not receiving the reset email. This is extremely urgent as I need to access my files for a deadline.",
    category: 'complaint',
    priority: 'high',
    escalated: true,
    status: 'In Progress',
    assignedTo: agents[2],
    history: [
      { timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), action: 'Query created', actor: 'System' },
      { timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(), action: 'Assigned to Sarah Lee', actor: 'System' },
      { timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), action: 'Escalated to Support Leads', actor: 'Sarah Lee' },
      { timestamp: new Date(Date.now() - 0.5 * 60 * 60 * 1000).toISOString(), action: 'Assigned to David Kim', actor: 'System' }
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    resolvedAt: null,
  },
  {
    id: 'VR-19874',
    customer: { name: 'Jane Smith', avatarUrl: 'https://picsum.photos/seed/janesmith/40/40', email: 'jane.s@example.com' },
    source: 'Twitter',
    content: "Just wanted to say your new feature is amazing! It's saving me so much time. Great job team!",
    category: 'question',
    priority: 'low',
    escalated: false,
    status: 'Resolved',
    assignedTo: agents[0],
    history: [
      { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), action: 'Query created and assigned', actor: 'System' },
      { timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(), action: 'Marked as resolved', actor: 'Sarah Lee' }
    ],
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(Date.now() - 22 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'VR-55432',
    customer: { name: 'Bob Johnson', avatarUrl: 'https://picsum.photos/seed/bobjohnson/40/40', email: 'bob.j@example.com' },
    source: 'Chat',
    content: 'How do I export my data to a CSV file? I looked in the settings but could not find the option.',
    category: 'question',
    priority: 'medium',
    escalated: false,
    status: 'Open',
    assignedTo: agents[1],
    history: [{ timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(), action: 'Query created and assigned', actor: 'System' }],
    createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    resolvedAt: null,
  },
  {
    id: 'VR-78901',
    customer: { name: 'Alice Williams', avatarUrl: 'https://picsum.photos/seed/alicewilliams/40/40', email: 'alice.w@example.com' },
    source: 'Email',
    content: 'Could you add support for dark mode? I use your app at night and the bright screen is straining my eyes.',
    category: 'request',
    priority: 'medium',
    escalated: false,
    status: 'In Progress',
    assignedTo: agents[3],
    history: [
      { timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), action: 'Query created', actor: 'System' },
      { timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString(), action: 'Triaged and assigned to Engineering', actor: 'David Kim' }
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: null,
  },
  {
    id: 'VR-23456',
    customer: { name: 'Charlie Brown', avatarUrl: 'https://picsum.photos/seed/charliebrown/40/40', email: 'charlie.b@example.com' },
    source: 'Facebook',
    content: "The app crashed when I tried to upload a file larger than 50MB. Is this a known issue? I'm on the latest version.",
    category: 'complaint',
    priority: 'high',
    escalated: false,
    status: 'Open',
    assignedTo: agents[3],
    history: [{ timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), action: 'Query created and assigned to Engineering', actor: 'System' }],
    createdAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    resolvedAt: null,
  }
];
