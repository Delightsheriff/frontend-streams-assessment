export interface ConversationCard {
  title: string;
  subheading: string;
  content: string;
}

export interface DataSource {
  name: string;
  date: string;
  description: string;
}

export interface ConversationData {
  section1: {
    title: string;
    content: string;
  };
  section2Cards: ConversationCard[];
  section3: {
    title: string;
    content: string;
  };
  dataSources: DataSource[];
}

export interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  isBookmarked: boolean;
  data: ConversationData;
}
