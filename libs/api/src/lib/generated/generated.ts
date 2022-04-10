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
  lt?: InputMaybe<Scalars['BigInt']>;
  lte?: InputMaybe<Scalars['BigInt']>;
  neq?: InputMaybe<Scalars['BigInt']>;
};

/** Boolean expression comparing fields on type "Boolean" */
export type BooleanFilter = {
  eq?: InputMaybe<Scalars['Boolean']>;
  gt?: InputMaybe<Scalars['Boolean']>;
  gte?: InputMaybe<Scalars['Boolean']>;
  lt?: InputMaybe<Scalars['Boolean']>;
  lte?: InputMaybe<Scalars['Boolean']>;
  neq?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression comparing fields on type "Date" */
export type DateFilter = {
  eq?: InputMaybe<Scalars['Date']>;
  gt?: InputMaybe<Scalars['Date']>;
  gte?: InputMaybe<Scalars['Date']>;
  lt?: InputMaybe<Scalars['Date']>;
  lte?: InputMaybe<Scalars['Date']>;
  neq?: InputMaybe<Scalars['Date']>;
};

/** Boolean expression comparing fields on type "Datetime" */
export type DatetimeFilter = {
  eq?: InputMaybe<Scalars['Datetime']>;
  gt?: InputMaybe<Scalars['Datetime']>;
  gte?: InputMaybe<Scalars['Datetime']>;
  lt?: InputMaybe<Scalars['Datetime']>;
  lte?: InputMaybe<Scalars['Datetime']>;
  neq?: InputMaybe<Scalars['Datetime']>;
};

export enum EventTimeStatus {
  Passed = 'passed',
  Scheduled = 'scheduled',
  TodayLive = 'today_live',
  TodayPassed = 'today_passed',
  TodayScheduled = 'today_scheduled'
}

export enum EventType {
  ClubhouseLive = 'clubhouse_live',
  HybridLive = 'hybrid_live',
  StreamingLive = 'streaming_live'
}

/** Boolean expression comparing fields on type "Float" */
export type FloatFilter = {
  eq?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  neq?: InputMaybe<Scalars['Float']>;
};

/** Boolean expression comparing fields on type "Int" */
export type IntFilter = {
  eq?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  neq?: InputMaybe<Scalars['Int']>;
};

/** Boolean expression comparing fields on type "JSON" */
export type JsonFilter = {
  eq?: InputMaybe<Scalars['JSON']>;
  neq?: InputMaybe<Scalars['JSON']>;
};

/** The root type for creating and mutating data */
export type Mutation = {
  /** Deletes zero or more records from the collection */
  deleteFromactivist_requestsCollection: Activist_RequestsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromevent_speakerCollection: Event_SpeakerDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromeventsCollection: EventsDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromslidesCollection: SlidesDeleteResponse;
  /** Deletes zero or more records from the collection */
  deleteFromspeakersCollection: SpeakersDeleteResponse;
  /** Adds one or more `activist_requestsInsertResponse` records to the collection */
  insertIntoactivist_requestsCollection?: Maybe<Activist_RequestsInsertResponse>;
  /** Adds one or more `event_speakerInsertResponse` records to the collection */
  insertIntoevent_speakerCollection?: Maybe<Event_SpeakerInsertResponse>;
  /** Adds one or more `eventsInsertResponse` records to the collection */
  insertIntoeventsCollection?: Maybe<EventsInsertResponse>;
  /** Adds one or more `slidesInsertResponse` records to the collection */
  insertIntoslidesCollection?: Maybe<SlidesInsertResponse>;
  /** Adds one or more `speakersInsertResponse` records to the collection */
  insertIntospeakersCollection?: Maybe<SpeakersInsertResponse>;
  /** Updates zero or more records in the collection */
  updateactivist_requestsCollection: Activist_RequestsUpdateResponse;
  /** Updates zero or more records in the collection */
  updateevent_speakerCollection: Event_SpeakerUpdateResponse;
  /** Updates zero or more records in the collection */
  updateeventsCollection: EventsUpdateResponse;
  /** Updates zero or more records in the collection */
  updateslidesCollection: SlidesUpdateResponse;
  /** Updates zero or more records in the collection */
  updatespeakersCollection: SpeakersUpdateResponse;
};


/** The root type for creating and mutating data */
export type MutationDeleteFromactivist_RequestsCollectionArgs = {
  atMost?: Scalars['Int'];
  filter?: InputMaybe<Activist_RequestsFilter>;
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

/** Defines a per-field sorting order */
export enum OrderByDirection {
  AscNullsFirst = 'AscNullsFirst',
  AscNullsLast = 'AscNullsLast',
  DescNullsFirst = 'DescNullsFirst',
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
  /** A pagable collection of type `event_speaker` */
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  /** A pagable collection of type `events` */
  eventsCollection?: Maybe<EventsConnection>;
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

export enum SlideType {
  Article = 'article',
  Slides = 'slides',
  Video = 'video'
}

export enum SpeakerType {
  Moderator = 'moderator',
  Relator = 'relator'
}

/** Boolean expression comparing fields on type "String" */
export type StringFilter = {
  eq?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  neq?: InputMaybe<Scalars['String']>;
};

export enum TicketsType {
  Clubhouse = 'clubhouse',
  Eventbrite = 'eventbrite'
}

/** Boolean expression comparing fields on type "Time" */
export type TimeFilter = {
  eq?: InputMaybe<Scalars['Time']>;
  gt?: InputMaybe<Scalars['Time']>;
  gte?: InputMaybe<Scalars['Time']>;
  lt?: InputMaybe<Scalars['Time']>;
  lte?: InputMaybe<Scalars['Time']>;
  neq?: InputMaybe<Scalars['Time']>;
};

/** Boolean expression comparing fields on type "UUID" */
export type UuidFilter = {
  eq?: InputMaybe<Scalars['UUID']>;
  neq?: InputMaybe<Scalars['UUID']>;
};

export type Activist_Requests = {
  accepted: Scalars['Boolean'];
  created_at: Scalars['Datetime'];
  email: Scalars['String'];
  email_sent: Scalars['Boolean'];
  id: Scalars['BigInt'];
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
  node?: Maybe<Activist_Requests>;
};

export type Activist_RequestsFilter = {
  accepted?: InputMaybe<BooleanFilter>;
  created_at?: InputMaybe<DatetimeFilter>;
  email?: InputMaybe<StringFilter>;
  email_sent?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<BigIntFilter>;
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

export type Event_Speaker = {
  event_id: Scalars['Int'];
  events?: Maybe<Events>;
  speaker_id: Scalars['Int'];
  speaker_type: Scalars['String'];
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
  node?: Maybe<Event_Speaker>;
};

export type Event_SpeakerFilter = {
  event_id?: InputMaybe<IntFilter>;
  speaker_id?: InputMaybe<IntFilter>;
  speaker_type?: InputMaybe<StringFilter>;
};

export type Event_SpeakerInsertInput = {
  event_id?: InputMaybe<Scalars['Int']>;
  speaker_id?: InputMaybe<Scalars['Int']>;
  speaker_type?: InputMaybe<Scalars['String']>;
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
  speaker_type?: InputMaybe<Scalars['String']>;
};

export type Event_SpeakerUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Event_Speaker>;
};

export type Events = {
  can_mint_certificate: Scalars['Boolean'];
  canceled: Scalars['Boolean'];
  duration: Scalars['Int'];
  end_timestamp?: Maybe<Scalars['Datetime']>;
  event_description?: Maybe<Scalars['String']>;
  event_image_url?: Maybe<Scalars['String']>;
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  event_time_status?: Maybe<Scalars['String']>;
  event_title: Scalars['String'];
  event_type: Scalars['String'];
  eventbrite_event_id?: Maybe<Scalars['String']>;
  facebook_video_url?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  identifier: Scalars['String'];
  linkedin_video_url?: Maybe<Scalars['String']>;
  room_url?: Maybe<Scalars['String']>;
  show: Scalars['Boolean'];
  slidesCollection?: Maybe<SlidesConnection>;
  slides_auth_required: Scalars['Boolean'];
  start_timestamp?: Maybe<Scalars['Datetime']>;
  tickets_type: Scalars['String'];
  tickets_url?: Maybe<Scalars['String']>;
  twitter_video_url?: Maybe<Scalars['String']>;
  video_url?: Maybe<Scalars['String']>;
  voting_url?: Maybe<Scalars['String']>;
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
  node?: Maybe<Events>;
};

export type EventsFilter = {
  can_mint_certificate?: InputMaybe<BooleanFilter>;
  canceled?: InputMaybe<BooleanFilter>;
  duration?: InputMaybe<IntFilter>;
  end_timestamp?: InputMaybe<DatetimeFilter>;
  event_description?: InputMaybe<StringFilter>;
  event_image_url?: InputMaybe<StringFilter>;
  event_title?: InputMaybe<StringFilter>;
  event_type?: InputMaybe<StringFilter>;
  eventbrite_event_id?: InputMaybe<StringFilter>;
  facebook_video_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  identifier?: InputMaybe<StringFilter>;
  linkedin_video_url?: InputMaybe<StringFilter>;
  room_url?: InputMaybe<StringFilter>;
  show?: InputMaybe<BooleanFilter>;
  slides_auth_required?: InputMaybe<BooleanFilter>;
  start_timestamp?: InputMaybe<DatetimeFilter>;
  tickets_type?: InputMaybe<StringFilter>;
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
  event_type?: InputMaybe<Scalars['String']>;
  eventbrite_event_id?: InputMaybe<Scalars['String']>;
  facebook_video_url?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  linkedin_video_url?: InputMaybe<Scalars['String']>;
  room_url?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
  slides_auth_required?: InputMaybe<Scalars['Boolean']>;
  start_timestamp?: InputMaybe<Scalars['Datetime']>;
  tickets_type?: InputMaybe<Scalars['String']>;
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
  event_type?: InputMaybe<Scalars['String']>;
  eventbrite_event_id?: InputMaybe<Scalars['String']>;
  facebook_video_url?: InputMaybe<Scalars['String']>;
  identifier?: InputMaybe<Scalars['String']>;
  linkedin_video_url?: InputMaybe<Scalars['String']>;
  room_url?: InputMaybe<Scalars['String']>;
  show?: InputMaybe<Scalars['Boolean']>;
  slides_auth_required?: InputMaybe<Scalars['Boolean']>;
  start_timestamp?: InputMaybe<Scalars['Datetime']>;
  tickets_type?: InputMaybe<Scalars['String']>;
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

export type Slides = {
  event_id: Scalars['BigInt'];
  events?: Maybe<Events>;
  id: Scalars['BigInt'];
  show_before_event_start: Scalars['Boolean'];
  slide_description?: Maybe<Scalars['String']>;
  slide_title: Scalars['String'];
  slide_type: Scalars['String'];
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
  node?: Maybe<Slides>;
};

export type SlidesFilter = {
  event_id?: InputMaybe<BigIntFilter>;
  id?: InputMaybe<BigIntFilter>;
  show_before_event_start?: InputMaybe<BooleanFilter>;
  slide_description?: InputMaybe<StringFilter>;
  slide_title?: InputMaybe<StringFilter>;
  slide_type?: InputMaybe<StringFilter>;
  slide_url?: InputMaybe<StringFilter>;
};

export type SlidesInsertInput = {
  event_id?: InputMaybe<Scalars['BigInt']>;
  show_before_event_start?: InputMaybe<Scalars['Boolean']>;
  slide_description?: InputMaybe<Scalars['String']>;
  slide_title?: InputMaybe<Scalars['String']>;
  slide_type?: InputMaybe<Scalars['String']>;
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
  slide_type?: InputMaybe<Scalars['String']>;
  slide_url?: InputMaybe<Scalars['String']>;
};

export type SlidesUpdateResponse = {
  /** Count of the records impacted by the mutation */
  affectedCount: Scalars['Int'];
  /** Array of records impacted by the mutation */
  records: Array<Slides>;
};

export type Speakers = {
  event_speakerCollection?: Maybe<Event_SpeakerConnection>;
  facebook_url?: Maybe<Scalars['String']>;
  id: Scalars['BigInt'];
  linkedin_url?: Maybe<Scalars['String']>;
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
  node?: Maybe<Speakers>;
};

export type SpeakersFilter = {
  facebook_url?: InputMaybe<StringFilter>;
  id?: InputMaybe<BigIntFilter>;
  linkedin_url?: InputMaybe<StringFilter>;
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

export type GetEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEventsQuery = { eventsCollection?: { edges: Array<{ node?: { id: any, identifier: string, event_image_url?: string | null, event_title: string, event_description?: string | null, start_timestamp?: any | null, event_type: string, duration: number, canceled: boolean, event_time_status?: string | null, video_url?: string | null, voting_url?: string | null, slidesCollection?: { totalCount: number } | null } | null }> } | null };

export type GetEventDetailsQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetEventDetailsQuery = { eventsCollection?: { edges: Array<{ node?: { start_timestamp?: any | null, duration: number, event_description?: string | null, event_image_url?: string | null, event_time_status?: string | null, event_title: string, event_type: string, eventbrite_event_id?: string | null, facebook_video_url?: string | null, id: any, identifier: string, linkedin_video_url?: string | null, room_url?: string | null, slides_auth_required: boolean, tickets_type: string, tickets_url?: string | null, twitter_video_url?: string | null, video_url?: string | null, voting_url?: string | null, canceled: boolean, event_speakerCollection?: { edges: Array<{ node?: { speaker_type: string, speakers?: { linkedin_url?: string | null, facebook_url?: string | null, id: any, speaker_description?: string | null, speaker_image_url?: string | null, speaker_name: string, twitter_url?: string | null, website_url?: string | null } | null } | null }> } | null, slidesCollection?: { totalCount: number, edges: Array<{ node?: { id: any, show_before_event_start: boolean, slide_description?: string | null, slide_title: string, slide_type: string, slide_url: string } | null }> } | null } | null }> } | null };

export type GetMintableEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMintableEventsQuery = { eventsCollection?: { edges: Array<{ node?: { id: any, identifier: string, event_image_url?: string | null, event_title: string, event_description?: string | null, start_timestamp?: any | null, event_type: string, duration: number, canceled: boolean, event_time_status?: string | null, eventbrite_event_id?: string | null } | null }> } | null };

export type GetEventToMintQueryVariables = Exact<{
  identifier: Scalars['String'];
}>;


export type GetEventToMintQuery = { eventsCollection?: { edges: Array<{ node?: { id: any, identifier: string, event_title: string, start_timestamp?: any | null, event_time_status?: string | null } | null }> } | null };

export type CheckActivistRequestQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckActivistRequestQuery = { activist_requestsCollection?: { edges: Array<{ node?: { id: any, email: string } | null }> } | null };


export const GetEventsDocument = gql`
    query GetEvents {
  eventsCollection {
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