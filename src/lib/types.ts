export type Query = {
  id: string;
  customer: {
    name: string;
    avatarUrl: string;
    email: string;
  };
  source: 'Email' | 'Twitter' | 'Chat' | 'Facebook';
  content: string;
  category: 'question' | 'request' | 'complaint' | 'unclassified';
  priority: 'high' | 'medium' | 'low' | 'unclassified';
  escalated: boolean;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignedTo: Agent;
  history: HistoryEntry[];
  createdAt: string;
  resolvedAt: string | null;
};

export type Agent = {
  id: string;
  name: string;
  avatarUrl: string;
  team: 'Tier 1 Support' | 'Support Leads' | 'Engineering';
};

export type HistoryEntry = {
  timestamp: string;
  action: string;
  actor: string;
};
