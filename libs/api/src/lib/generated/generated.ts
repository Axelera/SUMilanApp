import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  Cursor: any;
  Date: any;
  Datetime: any;
  JSON: any;
  Time: any;
  UUID: any;
};

/** Boolean expression comparing fields on type "BigInt" */
export type BigIntFilter = {
  eq?: InputMaybe<Scalars['BigInt']>;
  gt?: InputMaybe<Scalars['BigInt']>;
  gte?: InputMaybe<Scalars['BigInt']>;
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  in?: InputMaybe<Array<Scalars['Date']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

export enum FilterIs {
  NotNull = 'NOT_NULL',
  Null = 'NULL'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "ID" */
export type IdFilter = {
  eq?: InputMaybe<Scalars['ID']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  /** Deletes zero or more records from the `activist_requests` collection */
  deleteFromactivist_requestsCollection: Activist_RequestsDeleteResponse;
  /** Deletes zero or more records from the `event_questions` collection */
  deleteFromevent_questionsCollection: Event_QuestionsDeleteResponse;
  /** Deletes zero or more records from the `event_speaker` collection */
  deleteFromevent_speakerCollection: Event_SpeakerDeleteResponse;
  /** Deletes zero or more records from the `events` collection */
  deleteFromeventsCollection: EventsDeleteResponse;
  /** Deletes zero or more records from the `slides` collection */
  deleteFromslidesCollection: SlidesDeleteResponse;
  /** Deletes zero or more records from the `speakers` collection */
  deleteFromspeakersCollection: SpeakersDeleteResponse;
  /** Adds one or more `activist_requests` records to the collection */
  insertIntoactivist_requestsCollection?: Maybe<Activist_RequestsInsertResponse>;
  /** Adds one or more `event_questions` records to the collection */
  insertIntoevent_questionsCollection?: Maybe<Event_QuestionsInsertResponse>;
  /** Adds one or more `event_speaker` records to the collection */
  insertIntoevent_speakerCollection?: Maybe<Event_SpeakerInsertResponse>;
  /** Adds one or more `events` records to the collection */
  insertIntoeventsCollection?: Maybe<EventsInsertResponse>;
  /** Adds one or more `slides` records to the collection */
  insertIntoslidesCollection?: Maybe<SlidesInsertResponse>;
  /** Adds one or more `speakers` records to the collection */
  insertIntospeakersCollection?: Maybe<SpeakersInsertResponse>;
  /** Updates zero or more records in the `activist_requests` collection */
  updateactivist_requestsCollection: Activist_RequestsUpdateResponse;
  /** Updates zero or more records in the `event_questions` collection */
  updateevent_questionsCollection: Event_QuestionsUpdateResponse;
  /** Updates zero or more records in the `event_speaker` collection */
  updateevent_speakerCollection: Event_SpeakerUpdateResponse;
  /** Updates zero or more records in the `events` collection */
  updateeventsCollection: EventsUpdateResponse;
  /** Updates zero or more records in the `slides` collection */
  updateslidesCollection: SlidesUpdateResponse;
  /** Updates zero or more records in the `speakers` collection */
  updatespeakersCollection: SpeakersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromactivist_RequestsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Activist_RequestsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromevent_QuestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_QuestionsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromevent_SpeakerCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SpeakerFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromslidesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SlidesFilter>;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromspeakersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SpeakersFilter>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoactivist_RequestsCollectionArgs = {
  objects: Array<Activist_RequestsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoevent_QuestionsCollectionArgs = {
  objects: Array<Event_QuestionsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoevent_SpeakerCollectionArgs = {
  objects: Array<Event_SpeakerInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoeventsCollectionArgs = {
  objects: Array<EventsInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntoslidesCollectionArgs = {
  objects: Array<SlidesInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationInsertIntospeakersCollectionArgs = {
  objects: Array<SpeakersInsertInput>;
};


/** The root type for creating and mutating data */
export type MutationUpdateactivist_RequestsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Activist_RequestsFilter>;
  set: Activist_RequestsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateevent_QuestionsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_QuestionsFilter>;
  set: Event_QuestionsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateevent_SpeakerCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Event_SpeakerFilter>;
  set: Event_SpeakerUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateeventsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<EventsFilter>;
  set: EventsUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdateslidesCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SlidesFilter>;
  set: SlidesUpdateInput;
};


/** The root type for creating and mutating data */
export type MutationUpdatespeakersCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<SpeakersFilter>;
  set: SpeakersUpdateInput;
};

export type Node = {
  /** Retrieves a record by `ID` */
  nodeId: Scalars['ID'];
};

/** Defines a per-field sorting order */
export enum OrderByDirection {
  /** Ascending order, nulls first */
  AscNullsFirst = 'AscNullsFirst',
  /** Ascending order, nulls last */
  AscNullsLast = 'AscNullsLast',
  /** Descending order, nulls first */
  DescNullsFirst = 'DescNullsFirst',
  /** Descending order, nulls last */
  DescNullsLast = 'DescNullsLast'
}

export type PageInfo = {
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

/** The root type for querying data */
export type Query = {
  /** A pagable collection of type `activist_requests` */
  activist_requestsCollection?: Maybe<Activist_RequestsConnection>;
  /** A pagable collection of type `event_questions` */
  event_questionsCollection?: Maybe<Event_QuestionsConnection>;
  /** A pagable collection of type `event_speaker` */
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  /** A pagable collection of type `events` */
  eventsCollection?: Maybe<EventsConnection>;
  /** Retrieve a record by its `ID` */
  node?: Maybe<Node>;
  /** A pagable collection of type `slides` */
  slidesCollection?: Maybe<SlidesConnection>;
  /** A pagable collection of type `speakers` */
  speakersCollection?: Maybe<SpeakersConnection>;
};


/** The root type for querying data */
export type QueryActivist_RequestsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Activist_RequestsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Activist_RequestsOrderBy>>;
};


/** The root type for querying data */
export type QueryEvent_QuestionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_QuestionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_QuestionsOrderBy>>;
};


/** The root type for querying data */
export type QueryEvent_SpeakerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SpeakerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SpeakerOrderBy>>;
};


/** The root type for querying data */
export type QueryEventsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<EventsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EventsOrderBy>>;
};


/** The root type for querying data */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root type for querying data */
export type QuerySlidesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SlidesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SlidesOrderBy>>;
};


/** The root type for querying data */
export type QuerySpeakersCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SpeakersFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SpeakersOrderBy>>;
};

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  in?: InputMaybe<Array<Scalars['Time']>>;
  is?: InputMaybe<FilterIs>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  in?: InputMaybe<Array<Scalars['UUID']>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Activist_Requests = Node & {
  accepted: Scalars['Boolean'];
  created_at: Scalars['Datetime'];
  email: Scalars['String'];
  email_sent: Scalars['Boolean'];
  id: Scalars['BigInt'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
};

export type Activist_RequestsConnection = {
  edges: Array<Activist_RequestsEdge>;
  pageInfo: PageInfo;
};

export type Activist_RequestsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Activist_Requests>;
};

export type Activist_RequestsEdge = {
  cursor: Scalars['String'];
  node: Activist_Requests;
};

export type Activist_RequestsFilter = {
  accepted?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  email_sent?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
};

export type Activist_RequestsInsertInput = {
  accepted?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  email_sent?: InputMaybe<Scalars['Boolean']>;
};

export type Activist_RequestsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Activist_Requests>;
};

export type Activist_RequestsOrderBy = {
  accepted?: InputMaybe<OrderByDirection>;
  created_at?: InputMaybe<OrderByDirection>;
  email?: InputMaybe<OrderByDirection>;
  email_sent?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
};

export type Activist_RequestsUpdateInput = {
  accepted?: InputMaybe<Scalars['Boolean']>;
  created_at?: InputMaybe<Scalars['Datetime']>;
  email?: InputMaybe<Scalars['String']>;
  email_sent?: InputMaybe<Scalars['Boolean']>;
};

export type Activist_RequestsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Activist_Requests>;
};

export type Event_Questions = Node & {
  created_at: Scalars['Datetime'];
  event_id: Scalars['BigInt'];
  events?: Maybe<Events>;
  id: Scalars['BigInt'];
  is_resolved: Scalars['Boolean'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  question_content: Scalars['String'];
  question_votes: Scalars['BigInt'];
};

export type Event_QuestionsConnection = {
  edges: Array<Event_QuestionsEdge>;
  pageInfo: PageInfo;
};

export type Event_QuestionsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Questions>;
};

export type Event_QuestionsEdge = {
  cursor: Scalars['String'];
  node: Event_Questions;
};

export type Event_QuestionsFilter = {
  created_at?: InputMaybe<DatetimeFilter>;
  event_id?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  is_resolved?: InputMaybe<BooleanFilter>;
  nodeId?: InputMaybe<IdFilter>;
  question_content?: InputMaybe<StringFilter>;
  question_votes?: InputMaybe<BigIntFilter>;
};

export type Event_QuestionsInsertInput = {
  created_at?: InputMaybe<Scalars['Datetime']>;
  event_id?: InputMaybe<Scalars['BigInt']>;
  is_resolved?: InputMaybe<Scalars['Boolean']>;
  question_content?: InputMaybe<Scalars['String']>;
  question_votes?: InputMaybe<Scalars['BigInt']>;
};

export type Event_QuestionsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Questions>;
};

export type Event_QuestionsOrderBy = {
  created_at?: InputMaybe<OrderByDirection>;
  event_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  is_resolved?: InputMaybe<OrderByDirection>;
  question_content?: InputMaybe<OrderByDirection>;
  question_votes?: InputMaybe<OrderByDirection>;
};

export type Event_QuestionsUpdateInput = {
  question_votes?: InputMaybe<Scalars['BigInt']>;
};

export type Event_QuestionsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Questions>;
};

export type Event_Speaker = Node & {
  event_id: Scalars['Int'];
  events?: Maybe<Events>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  speaker_id: Scalars['Int'];
  speaker_type: Speaker_Type;
  speakers?: Maybe<Speakers>;
};

export type Event_SpeakerConnection = {
  edges: Array<Event_SpeakerEdge>;
  pageInfo: PageInfo;
};

export type Event_SpeakerDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Speaker>;
};

export type Event_SpeakerEdge = {
  cursor: Scalars['String'];
  node: Event_Speaker;
};

export type Event_SpeakerFilter = {
  event_id?: InputMaybe<IntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  speaker_id?: InputMaybe<IntFilter>;
  speaker_type?: InputMaybe<Speaker_TypeFilter>;
};

export type Event_SpeakerInsertInput = {
  event_id?: InputMaybe<Scalars['Int']>;
  speaker_id?: InputMaybe<Scalars['Int']>;
  speaker_type?: InputMaybe<Speaker_Type>;
};

export type Event_SpeakerInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Speaker>;
};

export type Event_SpeakerOrderBy = {
  event_id?: InputMaybe<OrderByDirection>;
  speaker_id?: InputMaybe<OrderByDirection>;
  speaker_type?: InputMaybe<OrderByDirection>;
};

export type Event_SpeakerUpdateInput = {
  event_id?: InputMaybe<Scalars['Int']>;
  speaker_id?: InputMaybe<Scalars['Int']>;
  speaker_type?: InputMaybe<Speaker_Type>;
};

export type Event_SpeakerUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Speaker>;
};

export enum Event_Time_Status {
  Passed = 'passed',
  Scheduled = 'scheduled',
  TodayLive = 'today_live',
  TodayPassed = 'today_passed',
  TodayScheduled = 'today_scheduled'
}

/** Boolean expression comparing fields on type "event_time_status" */
export type Event_Time_StatusFilter = {
  eq?: InputMaybe<Event_Time_Status>;
  in?: InputMaybe<Array<Event_Time_Status>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Event_Time_Status>;
};

export enum Event_Type {
  ClubhouseLive = 'clubhouse_live',
  HybridLive = 'hybrid_live',
  StreamingLive = 'streaming_live'
}

/** Boolean expression comparing fields on type "event_type" */
export type Event_TypeFilter = {
  eq?: InputMaybe<Event_Type>;
  in?: InputMaybe<Array<Event_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Event_Type>;
};

export type Events = Node & {
  can_mint_certificate: Scalars['Boolean'];
  canceled: Scalars['Boolean'];
  duration: Scalars['Int'];
  end_timestamp?: Maybe<Scalars['Datetime']>;
  event_description?: Maybe<Scalars['String']>;
  event_image_url?: Maybe<Scalars['String']>;
  event_questionsCollection?: Maybe<Event_QuestionsConnection>;
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  event_time_status?: Maybe<Event_Time_Status>;
  event_title: Scalars['String'];
  event_type: Event_Type;
  eventbrite_event_id?: Maybe<Scalars['String']>;
  facebook_video_url?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  identifier: Scalars['String'];
  linkedin_video_url?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  room_url?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
  slidesCollection?: Maybe<SlidesConnection>;
  slides_auth_required: Scalars['Boolean'];
  start_timestamp?: Maybe<Scalars['Datetime']>;
  tickets_type: Tickets_Type;
  tickets_url?: Maybe<Scalars['String']>;
  twitter_video_url?: Maybe<Scalars['String']>;
  video_url?: Maybe<Scalars['String']>;
  voting_url?: Maybe<Scalars['String']>;
};


export type EventsEvent_QuestionsCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_QuestionsFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_QuestionsOrderBy>>;
};


export type EventsEvent_SpeakerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SpeakerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SpeakerOrderBy>>;
};


export type EventsSlidesCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<SlidesFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SlidesOrderBy>>;
};

export type EventsConnection = {
  edges: Array<EventsEdge>;
  pageInfo: PageInfo;
};

export type EventsDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsEdge = {
  cursor: Scalars['String'];
  node: Events;
};

export type EventsFilter = {
  can_mint_certificate?: InputMaybe<BooleanFilter>;
  canceled?: InputMaybe<BooleanFilter>;
  duration?: InputMaybe<IntFilter>;
  end_timestamp?: InputMaybe<DatetimeFilter>;
  event_description?: InputMaybe<StringFilter>;
  event_image_url?: InputMaybe<StringFilter>;
  event_title?: InputMaybe<StringFilter>;
  event_type?: InputMaybe<Event_TypeFilter>;
  eventbrite_event_id?: InputMaybe<StringFilter>;
  facebook_video_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  identifier?: InputMaybe<StringFilter>;
  linkedin_video_url?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  room_url?: InputMaybe<StringFilter>;
  show?: InputMaybe<BooleanFilter>;
  slides_auth_required?: InputMaybe<BooleanFilter>;
  start_timestamp?: InputMaybe<DatetimeFilter>;
  tickets_type?: InputMaybe<Tickets_TypeFilter>;
  tickets_url?: InputMaybe<StringFilter>;
  twitter_video_url?: InputMaybe<StringFilter>;
  video_url?: InputMaybe<StringFilter>;
  voting_url?: InputMaybe<StringFilter>;
};

export type EventsInsertInput = {
  can_mint_certificate?: InputMaybe<Scalars['Boolean']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  duration?: InputMaybe<Scalars['Int']>;
  event_description?: InputMaybe<Scalars['String']>;
  event_image_url?: InputMaybe<Scalars['String']>;
  event_title?: InputMaybe<Scalars['String']>;
  event_type?: InputMaybe<Event_Type>;
  eventbrite_event_id?: InputMaybe<Scalars['String']>;
  facebook_video_url?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  linkedin_video_url?: InputMaybe<Scalars['String']>;
  room_url?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
  slides_auth_required?: InputMaybe<Scalars['Boolean']>;
  start_timestamp?: InputMaybe<Scalars['Datetime']>;
  tickets_type?: InputMaybe<Tickets_Type>;
  tickets_url?: InputMaybe<Scalars['String']>;
  twitter_video_url?: InputMaybe<Scalars['String']>;
  video_url?: InputMaybe<Scalars['String']>;
  voting_url?: InputMaybe<Scalars['String']>;
};

export type EventsInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export type EventsOrderBy = {
  can_mint_certificate?: InputMaybe<OrderByDirection>;
  canceled?: InputMaybe<OrderByDirection>;
  duration?: InputMaybe<OrderByDirection>;
  end_timestamp?: InputMaybe<OrderByDirection>;
  event_description?: InputMaybe<OrderByDirection>;
  event_image_url?: InputMaybe<OrderByDirection>;
  event_title?: InputMaybe<OrderByDirection>;
  event_type?: InputMaybe<OrderByDirection>;
  eventbrite_event_id?: InputMaybe<OrderByDirection>;
  facebook_video_url?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  identifier?: InputMaybe<OrderByDirection>;
  linkedin_video_url?: InputMaybe<OrderByDirection>;
  room_url?: InputMaybe<OrderByDirection>;
  show?: InputMaybe<OrderByDirection>;
  slides_auth_required?: InputMaybe<OrderByDirection>;
  start_timestamp?: InputMaybe<OrderByDirection>;
  tickets_type?: InputMaybe<OrderByDirection>;
  tickets_url?: InputMaybe<OrderByDirection>;
  twitter_video_url?: InputMaybe<OrderByDirection>;
  video_url?: InputMaybe<OrderByDirection>;
  voting_url?: InputMaybe<OrderByDirection>;
};

export type EventsUpdateInput = {
  can_mint_certificate?: InputMaybe<Scalars['Boolean']>;
  canceled?: InputMaybe<Scalars['Boolean']>;
  duration?: InputMaybe<Scalars['Int']>;
  event_description?: InputMaybe<Scalars['String']>;
  event_image_url?: InputMaybe<Scalars['String']>;
  event_title?: InputMaybe<Scalars['String']>;
  event_type?: InputMaybe<Event_Type>;
  eventbrite_event_id?: InputMaybe<Scalars['String']>;
  facebook_video_url?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  linkedin_video_url?: InputMaybe<Scalars['String']>;
  room_url?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
  slides_auth_required?: InputMaybe<Scalars['Boolean']>;
  start_timestamp?: InputMaybe<Scalars['Datetime']>;
  tickets_type?: InputMaybe<Tickets_Type>;
  tickets_url?: InputMaybe<Scalars['String']>;
  twitter_video_url?: InputMaybe<Scalars['String']>;
  video_url?: InputMaybe<Scalars['String']>;
  voting_url?: InputMaybe<Scalars['String']>;
};

export type EventsUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Events>;
};

export enum Slide_Type {
  Article = 'article',
  Slides = 'slides',
  Video = 'video'
}

/** Boolean expression comparing fields on type "slide_type" */
export type Slide_TypeFilter = {
  eq?: InputMaybe<Slide_Type>;
  in?: InputMaybe<Array<Slide_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Slide_Type>;
};

export type Slides = Node & {
  event_id: Scalars['BigInt'];
  events?: Maybe<Events>;
  id: Scalars['BigInt'];
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  show_before_event_start: Scalars['Boolean'];
  slide_description?: Maybe<Scalars['String']>;
  slide_title: Scalars['String'];
  slide_type: Slide_Type;
  slide_url: Scalars['String'];
};

export type SlidesConnection = {
  edges: Array<SlidesEdge>;
  pageInfo: PageInfo;
  /** The total number of records matching the `filter` criteria */
  totalCount: Scalars['Int'];
};

export type SlidesDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Slides>;
};

export type SlidesEdge = {
  cursor: Scalars['String'];
  node: Slides;
};

export type SlidesFilter = {
  event_id?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  nodeId?: InputMaybe<IdFilter>;
  show_before_event_start?: InputMaybe<BooleanFilter>;
  slide_description?: InputMaybe<StringFilter>;
  slide_title?: InputMaybe<StringFilter>;
  slide_type?: InputMaybe<Slide_TypeFilter>;
  slide_url?: InputMaybe<StringFilter>;
};

export type SlidesInsertInput = {
  event_id?: InputMaybe<Scalars['BigInt']>;
  show_before_event_start?: InputMaybe<Scalars['Boolean']>;
  slide_description?: InputMaybe<Scalars['String']>;
  slide_title?: InputMaybe<Scalars['String']>;
  slide_type?: InputMaybe<Slide_Type>;
  slide_url?: InputMaybe<Scalars['String']>;
};

export type SlidesInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Slides>;
};

export type SlidesOrderBy = {
  event_id?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  show_before_event_start?: InputMaybe<OrderByDirection>;
  slide_description?: InputMaybe<OrderByDirection>;
  slide_title?: InputMaybe<OrderByDirection>;
  slide_type?: InputMaybe<OrderByDirection>;
  slide_url?: InputMaybe<OrderByDirection>;
};

export type SlidesUpdateInput = {
  event_id?: InputMaybe<Scalars['BigInt']>;
  show_before_event_start?: InputMaybe<Scalars['Boolean']>;
  slide_description?: InputMaybe<Scalars['String']>;
  slide_title?: InputMaybe<Scalars['String']>;
  slide_type?: InputMaybe<Slide_Type>;
  slide_url?: InputMaybe<Scalars['String']>;
};

export type SlidesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Slides>;
};

export enum Speaker_Type {
  Moderator = 'moderator',
  Relator = 'relator'
}

/** Boolean expression comparing fields on type "speaker_type" */
export type Speaker_TypeFilter = {
  eq?: InputMaybe<Speaker_Type>;
  in?: InputMaybe<Array<Speaker_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Speaker_Type>;
};

export type Speakers = Node & {
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  facebook_url?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  linkedin_url?: Maybe<Scalars['String']>;
  /** Globally Unique Record Identifier */
  nodeId: Scalars['ID'];
  speaker_description?: Maybe<Scalars['String']>;
  speaker_image_url?: Maybe<Scalars['String']>;
  speaker_name: Scalars['String'];
  twitter_url?: Maybe<Scalars['String']>;
  website_url?: Maybe<Scalars['String']>;
};


export type SpeakersEvent_SpeakerCollectionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  filter?: InputMaybe<Event_SpeakerFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Event_SpeakerOrderBy>>;
};

export type SpeakersConnection = {
  edges: Array<SpeakersEdge>;
  pageInfo: PageInfo;
};

export type SpeakersDeleteResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Speakers>;
};

export type SpeakersEdge = {
  cursor: Scalars['String'];
  node: Speakers;
};

export type SpeakersFilter = {
  facebook_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  linkedin_url?: InputMaybe<StringFilter>;
  nodeId?: InputMaybe<IdFilter>;
  speaker_description?: InputMaybe<StringFilter>;
  speaker_image_url?: InputMaybe<StringFilter>;
  speaker_name?: InputMaybe<StringFilter>;
  twitter_url?: InputMaybe<StringFilter>;
  website_url?: InputMaybe<StringFilter>;
};

export type SpeakersInsertInput = {
  facebook_url?: InputMaybe<Scalars['String']>;
  linkedin_url?: InputMaybe<Scalars['String']>;
  speaker_description?: InputMaybe<Scalars['String']>;
  speaker_image_url?: InputMaybe<Scalars['String']>;
  speaker_name?: InputMaybe<Scalars['String']>;
  twitter_url?: InputMaybe<Scalars['String']>;
  website_url?: InputMaybe<Scalars['String']>;
};

export type SpeakersInsertResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Speakers>;
};

export type SpeakersOrderBy = {
  facebook_url?: InputMaybe<OrderByDirection>;
  id?: InputMaybe<OrderByDirection>;
  linkedin_url?: InputMaybe<OrderByDirection>;
  speaker_description?: InputMaybe<OrderByDirection>;
  speaker_image_url?: InputMaybe<OrderByDirection>;
  speaker_name?: InputMaybe<OrderByDirection>;
  twitter_url?: InputMaybe<OrderByDirection>;
  website_url?: InputMaybe<OrderByDirection>;
};

export type SpeakersUpdateInput = {
  facebook_url?: InputMaybe<Scalars['String']>;
  linkedin_url?: InputMaybe<Scalars['String']>;
  speaker_description?: InputMaybe<Scalars['String']>;
  speaker_image_url?: InputMaybe<Scalars['String']>;
  speaker_name?: InputMaybe<Scalars['String']>;
  twitter_url?: InputMaybe<Scalars['String']>;
  website_url?: InputMaybe<Scalars['String']>;
};

export type SpeakersUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Speakers>;
};

export enum Tickets_Type {
  Clubhouse = 'clubhouse',
  Eventbrite = 'eventbrite'
}

/** Boolean expression comparing fields on type "tickets_type" */
export type Tickets_TypeFilter = {
  eq?: InputMaybe<Tickets_Type>;
  in?: InputMaybe<Array<Tickets_Type>>;
  is?: InputMaybe<FilterIs>;
  neq?: InputMaybe<Tickets_Type>;
};

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { eventsCollection?: { edges: Array<{ node: { id: any, identifier: string, event_image_url?: string | null, event_title: string, event_description?: string | null, start_timestamp?: any | null, event_type: Event_Type, duration: number, canceled: boolean, event_time_status?: Event_Time_Status | null, video_url?: string | null, voting_url?: string | null, slidesCollection?: { totalCount: number } | null } }> } | null };

export type GetEventDetailsQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetEventDetailsQuery = { eventsCollection?: { edges: Array<{ node: { start_timestamp?: any | null, duration: number, event_description?: string | null, event_image_url?: string | null, event_time_status?: Event_Time_Status | null, event_title: string, event_type: Event_Type, eventbrite_event_id?: string | null, facebook_video_url?: string | null, id: any, identifier: string, linkedin_video_url?: string | null, room_url?: string | null, slides_auth_required: boolean, tickets_type: Tickets_Type, tickets_url?: string | null, twitter_video_url?: string | null, video_url?: string | null, voting_url?: string | null, canceled: boolean, event_speakerCollection?: { edges: Array<{ node: { speaker_type: Speaker_Type, speakers?: { linkedin_url?: string | null, facebook_url?: string | null, id: any, speaker_description?: string | null, speaker_image_url?: string | null, speaker_name: string, twitter_url?: string | null, website_url?: string | null } | null } }> } | null, slidesCollection?: { totalCount: number, edges: Array<{ node: { id: any, show_before_event_start: boolean, slide_description?: string | null, slide_title: string, slide_type: Slide_Type, slide_url: string } }> } | null } }> } | null };

export type GetMintableEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMintableEventsQuery = { eventsCollection?: { edges: Array<{ node: { id: any, identifier: string, event_image_url?: string | null, event_title: string, event_description?: string | null, start_timestamp?: any | null, event_type: Event_Type, duration: number, canceled: boolean, event_time_status?: Event_Time_Status | null, eventbrite_event_id?: string | null } }> } | null };

export type GetEventToMintQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetEventToMintQuery = { eventsCollection?: { edges: Array<{ node: { id: any, identifier: string, event_title: string, start_timestamp?: any | null, event_time_status?: Event_Time_Status | null } }> } | null };

export type CheckActivistRequestQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckActivistRequestQuery = { activist_requestsCollection?: { edges: Array<{ node: { id: any, email: string } }> } | null };


export const GetEventsDocument = gql`
    query GetEvents {
  eventsCollection(orderBy: {start_timestamp: DescNullsLast}) {
    edges {
      node {
        id
        identifier
        event_image_url
        event_title
        event_description
        start_timestamp
        event_type
        duration
        canceled
        event_time_status
        video_url
        voting_url
        slidesCollection {
          totalCount
        }
      }
    }
  }
}
    `;

export function useGetEventsQuery(options?: Omit<Urql.UseQueryArgs<GetEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventsQuery>({ query: GetEventsDocument, ...options });
};
export const GetEventDetailsDocument = gql`
    query GetEventDetails($identifier: String!) {
  eventsCollection(filter: {identifier: {eq: $identifier}}) {
    edges {
      node {
        start_timestamp
        duration
        event_description
        event_image_url
        event_time_status
        event_title
        event_type
        eventbrite_event_id
        facebook_video_url
        id
        identifier
        linkedin_video_url
        room_url
        slides_auth_required
        tickets_type
        tickets_url
        twitter_video_url
        video_url
        voting_url
        canceled
        event_speakerCollection {
          edges {
            node {
              speakers {
                linkedin_url
                facebook_url
                id
                speaker_description
                speaker_image_url
                speaker_name
                twitter_url
                website_url
              }
              speaker_type
            }
          }
        }
        slidesCollection {
          edges {
            node {
              id
              show_before_event_start
              slide_description
              slide_title
              slide_type
              slide_url
            }
          }
          totalCount
        }
      }
    }
  }
}
    `;

export function useGetEventDetailsQuery(options: Omit<Urql.UseQueryArgs<GetEventDetailsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventDetailsQuery>({ query: GetEventDetailsDocument, ...options });
};
export const GetMintableEventsDocument = gql`
    query GetMintableEvents {
  eventsCollection(
    filter: {can_mint_certificate: {eq: true}, end_timestamp: {lt: "now()"}}
    orderBy: {start_timestamp: DescNullsLast}
  ) {
    edges {
      node {
        id
        identifier
        event_image_url
        event_title
        event_description
        start_timestamp
        event_type
        duration
        canceled
        event_time_status
        eventbrite_event_id
      }
    }
  }
}
    `;

export function useGetMintableEventsQuery(options?: Omit<Urql.UseQueryArgs<GetMintableEventsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetMintableEventsQuery>({ query: GetMintableEventsDocument, ...options });
};
export const GetEventToMintDocument = gql`
    query GetEventToMint($identifier: String!) {
  eventsCollection(
    filter: {identifier: {eq: $identifier}, can_mint_certificate: {eq: true}, end_timestamp: {lt: "now()"}}
  ) {
    edges {
      node {
        id
        identifier
        event_title
        start_timestamp
        event_time_status
      }
    }
  }
}
    `;

export function useGetEventToMintQuery(options: Omit<Urql.UseQueryArgs<GetEventToMintQueryVariables>, 'query'>) {
  return Urql.useQuery<GetEventToMintQuery>({ query: GetEventToMintDocument, ...options });
};
export const CheckActivistRequestDocument = gql`
    query CheckActivistRequest($email: String!) {
  activist_requestsCollection(filter: {email: {eq: $email}}) {
    edges {
      node {
        id
        email
      }
    }
  }
}
    `;

export function useCheckActivistRequestQuery(options: Omit<Urql.UseQueryArgs<CheckActivistRequestQueryVariables>, 'query'>) {
  return Urql.useQuery<CheckActivistRequestQuery>({ query: CheckActivistRequestDocument, ...options });
};