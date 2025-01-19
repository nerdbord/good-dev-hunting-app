--
-- PostgreSQL database dump
--

-- Dumped from database version 12.20 (Ubuntu 12.20-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 14.15 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: Currency; Type: TYPE; Schema: public; Owner: gdh
--

CREATE TYPE public."Currency" AS ENUM (
    'PLN',
    'EUR',
    'USD'
);


ALTER TYPE public."Currency" OWNER TO gdh;

--
-- Name: EmploymentType; Type: TYPE; Schema: public; Owner: gdh
--

CREATE TYPE public."EmploymentType" AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACT'
);


ALTER TYPE public."EmploymentType" OWNER TO gdh;

--
-- Name: PublishingState; Type: TYPE; Schema: public; Owner: gdh
--

CREATE TYPE public."PublishingState" AS ENUM (
    'DRAFT',
    'PENDING',
    'APPROVED',
    'REJECTED'
);


ALTER TYPE public."PublishingState" OWNER TO gdh;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: gdh
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'MODERATOR',
    'TEAM',
    'SPECIALIST',
    'HUNTER'
);


ALTER TYPE public."Role" OWNER TO gdh;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."Account" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text
);


ALTER TABLE public."Account" OWNER TO gdh;

--
-- Name: City; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."City" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."City" OWNER TO gdh;

--
-- Name: ContactRequest; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."ContactRequest" (
    id text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    "senderFullName" text NOT NULL,
    "senderEmail" text NOT NULL,
    "profileId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "senderId" text
);


ALTER TABLE public."ContactRequest" OWNER TO gdh;

--
-- Name: Country; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."Country" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Country" OWNER TO gdh;

--
-- Name: GitHubDetails; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."GitHubDetails" (
    id text NOT NULL,
    username text NOT NULL,
    "userId" text NOT NULL
);


ALTER TABLE public."GitHubDetails" OWNER TO gdh;

--
-- Name: Language; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."Language" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Language" OWNER TO gdh;

--
-- Name: Profile; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."Profile" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "fullName" text NOT NULL,
    "linkedIn" text,
    bio text NOT NULL,
    "countryId" text NOT NULL,
    "cityId" text NOT NULL,
    "remoteOnly" boolean NOT NULL,
    "position" text NOT NULL,
    seniority text NOT NULL,
    state public."PublishingState" DEFAULT 'DRAFT'::public."PublishingState" NOT NULL,
    "openForCityRelocation" boolean DEFAULT false NOT NULL,
    "openForCountryRelocation" boolean DEFAULT false NOT NULL,
    "employmentTypes" public."EmploymentType"[],
    "isOpenForWork" boolean DEFAULT true NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    currency public."Currency" DEFAULT 'PLN'::public."Currency" NOT NULL,
    "hourlyRateMax" integer DEFAULT 0 NOT NULL,
    "hourlyRateMin" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone,
    slug text NOT NULL,
    "cvUrl" text
);


ALTER TABLE public."Profile" OWNER TO gdh;

--
-- Name: ProfileView; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."ProfileView" (
    id text NOT NULL,
    "viewerId" text NOT NULL,
    "viewedProfileId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."ProfileView" OWNER TO gdh;

--
-- Name: RejectionReason; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."RejectionReason" (
    id text NOT NULL,
    "profileId" text NOT NULL,
    reason text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."RejectionReason" OWNER TO gdh;

--
-- Name: Technology; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."Technology" (
    id text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Technology" OWNER TO gdh;

--
-- Name: User; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."User" (
    id text NOT NULL,
    email text NOT NULL,
    "avatarUrl" text,
    roles public."Role"[] DEFAULT ARRAY['USER'::public."Role"],
    "nerdbordUserId" text,
    "emailVerified" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."User" OWNER TO gdh;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."VerificationToken" (
    identifier text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO gdh;

--
-- Name: _LanguageToProfile; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."_LanguageToProfile" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_LanguageToProfile" OWNER TO gdh;

--
-- Name: _ProfileToTechnology; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public."_ProfileToTechnology" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_ProfileToTechnology" OWNER TO gdh;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: gdh
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO gdh;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."Account" (id, "userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
bb0b1ec4-d611-4ce0-93dd-a44efa117f9e	1c2914f8-e801-4a2c-a8f5-04cd261ff233	oauth	github	22893188	\N	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	\N	bearer	read:user,user:email	\N	\N
900044c9-3a8c-439a-846e-9cf0eaa1ca52	64f16084-f44e-4b6b-b1a0-8f39ffaeb2b4	oauth	github	102195578	\N	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	\N	bearer	read:user,user:email	\N	\N
\.


--
-- Data for Name: City; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."City" (id, name) FROM stdin;
bd53daab-ab41-4906-baf5-ab1d20f963c5	Warszawa
da87c909-5af8-41d6-a69b-d41fa31772ef	Gdynia
\.


--
-- Data for Name: ContactRequest; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."ContactRequest" (id, subject, message, "senderFullName", "senderEmail", "profileId", "createdAt", "senderId") FROM stdin;
\.


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."Country" (id, name) FROM stdin;
8822ce62-bb82-4ffd-b453-e12922ee7880	Poland
\.


--
-- Data for Name: GitHubDetails; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."GitHubDetails" (id, username, "userId") FROM stdin;
2f22fde2-6a23-4a82-941c-2754ae665530	Sumick	1c2914f8-e801-4a2c-a8f5-04cd261ff233
2a951ecc-ba34-446e-866a-5bf8e9539d53	hansac91	64f16084-f44e-4b6b-b1a0-8f39ffaeb2b4
\.


--
-- Data for Name: Language; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."Language" (id, name) FROM stdin;
031ba25e-b990-434b-a434-3135a8ae4d1b	Japanese
706568ca-1d1d-405b-a7e4-8ced71e937e4	Polish
\.


--
-- Data for Name: Profile; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."Profile" (id, "userId", "fullName", "linkedIn", bio, "countryId", "cityId", "remoteOnly", "position", seniority, state, "openForCityRelocation", "openForCountryRelocation", "employmentTypes", "isOpenForWork", "viewCount", currency, "hourlyRateMax", "hourlyRateMin", "createdAt", "updatedAt", slug, "cvUrl") FROM stdin;
99c68fc0-02e6-4f68-adbd-62a57c856f5c	1c2914f8-e801-4a2c-a8f5-04cd261ff233	Jakub Wąs		Super dev, magik, programista 5 lat.	8822ce62-bb82-4ffd-b453-e12922ee7880	bd53daab-ab41-4906-baf5-ab1d20f963c5	f	Frontend	MIDDLE	DRAFT	f	f	{CONTRACT}	t	0	PLN	100	51	2024-12-11 18:21:38.453	2024-12-11 18:21:38.453	420	\N
6f3f6cf2-d0ce-4ad4-8a62-dd1bd984d08a	64f16084-f44e-4b6b-b1a0-8f39ffaeb2b4	Hania Saczuk	www.linkedin.com/in/hanna-saczuk	**the generated code** suggestions directly in the context of your code. The scope of Inline Chat is limited to the editor in which it's started, so it can only provide code suggestions for a **single file**.	8822ce62-bb82-4ffd-b453-e12922ee7880	da87c909-5af8-41d6-a69b-d41fa31772ef	f	Frontend	INTERN	DRAFT	f	f	{FULL_TIME}	t	0	PLN	50	1	2024-12-15 13:36:34.477	2024-12-15 13:36:34.477	hanias	
\.


--
-- Data for Name: ProfileView; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."ProfileView" (id, "viewerId", "viewedProfileId", "createdAt") FROM stdin;
\.


--
-- Data for Name: RejectionReason; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."RejectionReason" (id, "profileId", reason, "createdAt") FROM stdin;
\.


--
-- Data for Name: Technology; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."Technology" (id, name) FROM stdin;
94875ed7-4c1b-4ae9-aed8-9753a9cce6e8	RabbitMQ
55e4f8cd-b1aa-4aff-8ff1-de650c9f261b	JavaScript
553761fe-3a54-46cc-85ff-b1d0b9f6187d	SQL
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."User" (id, email, "avatarUrl", roles, "nerdbordUserId", "emailVerified", "createdAt") FROM stdin;
1c2914f8-e801-4a2c-a8f5-04cd261ff233	jakub@nerdz.pl	https://avatars.githubusercontent.com/u/22893188?v=4	{USER,SPECIALIST}	\N	\N	2024-12-11 18:12:21.903
64f16084-f44e-4b6b-b1a0-8f39ffaeb2b4	saczukhanna@gmail.com	https://avatars.githubusercontent.com/u/102195578?v=4	{USER,SPECIALIST}	\N	\N	2024-12-15 13:00:49.684
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."VerificationToken" (identifier, token, expires) FROM stdin;
\.


--
-- Data for Name: _LanguageToProfile; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."_LanguageToProfile" ("A", "B") FROM stdin;
031ba25e-b990-434b-a434-3135a8ae4d1b	99c68fc0-02e6-4f68-adbd-62a57c856f5c
706568ca-1d1d-405b-a7e4-8ced71e937e4	6f3f6cf2-d0ce-4ad4-8a62-dd1bd984d08a
\.


--
-- Data for Name: _ProfileToTechnology; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public."_ProfileToTechnology" ("A", "B") FROM stdin;
99c68fc0-02e6-4f68-adbd-62a57c856f5c	94875ed7-4c1b-4ae9-aed8-9753a9cce6e8
6f3f6cf2-d0ce-4ad4-8a62-dd1bd984d08a	55e4f8cd-b1aa-4aff-8ff1-de650c9f261b
6f3f6cf2-d0ce-4ad4-8a62-dd1bd984d08a	553761fe-3a54-46cc-85ff-b1d0b9f6187d
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: gdh
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
05c96c7b-7344-431f-9299-b5c15040d734	07b5b0e7bfd8611669cede1e17c0f9ba3f51649bd5f421bdd126db805ace3890	2024-12-03 18:48:51.276487+00	20240201221704_add_contact_request_and_team_role	\N	\N	2024-12-03 18:48:50.826146+00	1
2b186dfc-0eac-406f-a462-22bfb3fe892e	70beb1ea67361f1e94658de4895f32f7d2e36f35b1d8e5e8b018ba4719585bb5	2024-12-03 18:48:43.802686+00	20230530213439_initial_schema_setup	\N	\N	2024-12-03 18:48:43.303623+00	1
7cca18c2-979b-4291-b860-405d4cf2b875	dbb4fc4e5d6dadd78b857a9a4a01094886f10b7729a06acd2c7190f73b8353df	2024-12-03 18:48:44.420982+00	20230620132934_remove_email_add_optional_linkedin	\N	\N	2024-12-03 18:48:43.979288+00	1
8eef3a47-b092-4fc1-9999-8e218333af44	7391c6b7e866697032f690e3ca1293ac533e62ba9f8b30737917c7055444cbee	2024-12-03 18:48:45.042526+00	20230717135448_base_migration	\N	\N	2024-12-03 18:48:44.597862+00	1
893b4b40-a7b9-4e5a-b2da-629c9298c632	2e77ae724a1453416a47cf551371453e5c427bf61e81c177fbd3442a98ce7c18	2024-12-03 18:48:52.037612+00	20240202213701_add_is_profile_open_for_work_flag	\N	\N	2024-12-03 18:48:51.452951+00	1
92cf1807-3698-476b-89e1-ac272682127f	b8d76f569ca594910dd692f8758a593b9f92543cb8848d94d05ebadf27cca6f9	2024-12-03 18:48:45.659601+00	20230811131934_add_user_avatar_url	\N	\N	2024-12-03 18:48:45.218678+00	1
0f63345a-8d8f-4843-bf11-1ce15f2de38c	96b1237722e82c03bd6607cdcc5900f82cb0146c6d445e361f556cb70eb53506	2024-12-03 18:48:46.278305+00	20231006192149_user_role_setup	\N	\N	2024-12-03 18:48:45.835886+00	1
4678b28e-96f6-4782-8f6d-7b60f025eb27	dc85fc55a7b8ef043b89aae1cc6b72dba1de97f4aeec0f282a7ff3cda19e6c26	2024-12-03 18:48:57.045383+00	20240527123313_add_languages	\N	\N	2024-12-03 18:48:56.577155+00	1
70df3520-7c87-49b6-9972-e5d40ecb99ac	7a2c822fe3e6e113da0437749a634e6ccb51bc2eaf862372ca7fd0b5bc1b5544	2024-12-03 18:48:46.898221+00	20231007195915_move_role_from_profile_to_user	\N	\N	2024-12-03 18:48:46.45457+00	1
f0c6a157-8134-4c52-a083-0220c90b1ac4	2c4a74657a4722f0ae5068def19012f65d9009d6f811e083bae9bc8e545cbff7	2024-12-03 18:48:52.656233+00	20240204230615_add_created_at_to_contact_request	\N	\N	2024-12-03 18:48:52.21395+00	1
ae7b92bc-5d6b-4c92-9bab-e62c0a684e2a	70f998278e2c580d712ba79c82453edf7d81f0d8eaf8e5170e8a48ed2af49adb	2024-12-03 18:48:47.52023+00	20231007203511_changed_role_to_roles	\N	\N	2024-12-03 18:48:47.074783+00	1
0c55762c-a3a9-4d4f-a6c5-93df967a175e	d738f071e32bdc3e083943539f7e631becdd3d1962915392141e9aa767563625	2024-12-03 18:48:48.137883+00	20231009204411_remove_is_published_and_add_state_to_profile	\N	\N	2024-12-03 18:48:47.696271+00	1
f1f82caf-57e5-4421-9c66-b41a08a66d51	bc831a3e1c42972e7af652a0d119fb7a71412dddd563b4d46b3889dd3217ee3d	2024-12-03 18:48:48.763801+00	20231027204107_add_rejection_reason_table	\N	\N	2024-12-03 18:48:48.313955+00	1
130991ad-6a7c-4403-a6a0-1d8c164400e7	fbc5ec8467cbcd1885ca8222f22a1ed7a50976fea4dae52582f3cacfd6b82d85	2024-12-03 18:48:53.275468+00	20240220103200_addedn_view_counter_to_profile	\N	\N	2024-12-03 18:48:52.832638+00	1
86b6f7d8-9646-48e6-8a16-a3ead9d5b952	103a5d3ccb36384647245c2cd7398ff6def2eff169b975023c84268a3f305def	2024-12-03 18:48:49.385704+00	20231221174415_add_nerdbord_user_id	\N	\N	2024-12-03 18:48:48.941075+00	1
7f04582a-d459-4212-92dc-2c3974298534	617edc0db46713696670adf6d4fed5a583d53340e26ee1bc2af0ce3713e3898f	2024-12-03 18:48:50.008892+00	20240108104931_unique_cities_countries_relocation_on_profile	\N	\N	2024-12-03 18:48:49.561987+00	1
15cfa945-e421-463b-b83f-ea51e701ef16	2de54881f31dc064c9a03c9c7b601e5b6437da22dc62f08347d41780d760591d	2024-12-03 18:48:50.649735+00	20240126143523_add_tech_stack	\N	\N	2024-12-03 18:48:50.185027+00	1
31501a8c-b7c2-4942-b3eb-46292935335c	8e150ae39e342f7f9d3ff2440c8fa41c819f8d464ec508485753f53e5e9340ef	2024-12-03 18:48:57.664979+00	20241101132625_add_new_currencies	\N	\N	2024-12-03 18:48:57.222407+00	1
47d7338f-5f08-4d1d-bfa3-0bafeaeaab34	f14601d02c013b527c0327e21ab91526b5eb0856a93b8c4d43dd08184914497a	2024-12-03 18:48:53.912171+00	20240410190838_add_hunter_auth	\N	\N	2024-12-03 18:48:53.451452+00	1
0f7e8cd2-c765-42e9-b79f-7789c54aa503	cc2cd610393e3e7def0cb24a7623cfc993fdd3e0c877d08845043d7f223d38ac	2024-12-03 18:48:54.531518+00	20240418125115_add_salary_range	\N	\N	2024-12-03 18:48:54.088304+00	1
8c593c1c-6706-4aad-bb33-3734f23e89ac	2f23b4fe683391b6b10697d30035b616f86d6b8ca306e6af7efd2612f2e54cc9	2024-12-03 18:48:55.159291+00	20240422073143_add_profile_views_table	\N	\N	2024-12-03 18:48:54.708771+00	1
368e7bec-121b-42a0-b594-f315d439c53c	c70897c50d3ed690970e1052f243f0e89634558cfbff9db03912c2ee58e3ee9a	2024-12-03 18:48:58.286631+00	20241203132444_add_optional_slug_column_to_profile_table	\N	\N	2024-12-03 18:48:57.84218+00	1
9080b5f4-6954-4d46-99c1-9174e4ed5291	6fda19ce51dac022146efd1806850be4881fb444c2fa591279d3e7401bf33fc5	2024-12-03 18:48:55.778624+00	20240422183252_add_created_at_to_user_and_profile	\N	\N	2024-12-03 18:48:55.336234+00	1
781cfd97-bbf6-44cd-adbc-18bcd7ec4e26	b76ab7e37a8b490b2ed3f4c44e2175d05c5197f1a641713d028c37b9288aaf8d	2024-12-03 18:48:56.400606+00	20240425131158_connect_contact_request_with_user	\N	\N	2024-12-03 18:48:55.955015+00	1
f8871781-684d-4229-a1b0-b5e389280719	e2c80f6811363bbaa2eb22248d388e6da44e9d4a19b695587f50c69d96ef2747	2024-12-03 18:48:58.907986+00	20241203175027_change_slug_to_required	\N	\N	2024-12-03 18:48:58.462687+00	1
c2ebf5d9-df5b-4bc7-892d-140b3aad6ced	b0ed2b59d1a255ade6ad523735d622a203e782f1a25ce28101985ce7b949b454	2024-12-03 20:18:49.669815+00	20241203154903_add_cv_url_column_to_profile_model	\N	\N	2024-12-03 20:18:49.217387+00	1
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (id);


--
-- Name: City City_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."City"
    ADD CONSTRAINT "City_pkey" PRIMARY KEY (id);


--
-- Name: ContactRequest ContactRequest_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: GitHubDetails GitHubDetails_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."GitHubDetails"
    ADD CONSTRAINT "GitHubDetails_pkey" PRIMARY KEY (id);


--
-- Name: Language Language_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Language"
    ADD CONSTRAINT "Language_pkey" PRIMARY KEY (id);


--
-- Name: ProfileView ProfileView_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ProfileView"
    ADD CONSTRAINT "ProfileView_pkey" PRIMARY KEY (id);


--
-- Name: Profile Profile_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_pkey" PRIMARY KEY (id);


--
-- Name: RejectionReason RejectionReason_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."RejectionReason"
    ADD CONSTRAINT "RejectionReason_pkey" PRIMARY KEY (id);


--
-- Name: Technology Technology_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Technology"
    ADD CONSTRAINT "Technology_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Account_provider_providerAccountId_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON public."Account" USING btree (provider, "providerAccountId");


--
-- Name: City_name_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "City_name_key" ON public."City" USING btree (name);


--
-- Name: Country_id_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Country_id_key" ON public."Country" USING btree (id);


--
-- Name: Country_name_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Country_name_key" ON public."Country" USING btree (name);


--
-- Name: GitHubDetails_userId_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "GitHubDetails_userId_key" ON public."GitHubDetails" USING btree ("userId");


--
-- Name: GitHubDetails_username_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "GitHubDetails_username_key" ON public."GitHubDetails" USING btree (username);


--
-- Name: Language_name_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Language_name_key" ON public."Language" USING btree (name);


--
-- Name: Profile_slug_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Profile_slug_key" ON public."Profile" USING btree (slug);


--
-- Name: Profile_userId_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Profile_userId_key" ON public."Profile" USING btree ("userId");


--
-- Name: Technology_name_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "Technology_name_key" ON public."Technology" USING btree (name);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_nerdbordUserId_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "User_nerdbordUserId_key" ON public."User" USING btree ("nerdbordUserId");


--
-- Name: VerificationToken_identifier_token_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON public."VerificationToken" USING btree (identifier, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: _LanguageToProfile_AB_unique; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "_LanguageToProfile_AB_unique" ON public."_LanguageToProfile" USING btree ("A", "B");


--
-- Name: _LanguageToProfile_B_index; Type: INDEX; Schema: public; Owner: gdh
--

CREATE INDEX "_LanguageToProfile_B_index" ON public."_LanguageToProfile" USING btree ("B");


--
-- Name: _ProfileToTechnology_AB_unique; Type: INDEX; Schema: public; Owner: gdh
--

CREATE UNIQUE INDEX "_ProfileToTechnology_AB_unique" ON public."_ProfileToTechnology" USING btree ("A", "B");


--
-- Name: _ProfileToTechnology_B_index; Type: INDEX; Schema: public; Owner: gdh
--

CREATE INDEX "_ProfileToTechnology_B_index" ON public."_ProfileToTechnology" USING btree ("B");


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactRequest ContactRequest_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ContactRequest ContactRequest_senderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ContactRequest"
    ADD CONSTRAINT "ContactRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: GitHubDetails GitHubDetails_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."GitHubDetails"
    ADD CONSTRAINT "GitHubDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProfileView ProfileView_viewedProfileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ProfileView"
    ADD CONSTRAINT "ProfileView_viewedProfileId_fkey" FOREIGN KEY ("viewedProfileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProfileView ProfileView_viewerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."ProfileView"
    ADD CONSTRAINT "ProfileView_viewerId_fkey" FOREIGN KEY ("viewerId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Profile Profile_cityId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES public."City"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Profile Profile_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Profile Profile_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."Profile"
    ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: RejectionReason RejectionReason_profileId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."RejectionReason"
    ADD CONSTRAINT "RejectionReason_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: _LanguageToProfile _LanguageToProfile_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."_LanguageToProfile"
    ADD CONSTRAINT "_LanguageToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES public."Language"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _LanguageToProfile _LanguageToProfile_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."_LanguageToProfile"
    ADD CONSTRAINT "_LanguageToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProfileToTechnology _ProfileToTechnology_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."_ProfileToTechnology"
    ADD CONSTRAINT "_ProfileToTechnology_A_fkey" FOREIGN KEY ("A") REFERENCES public."Profile"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _ProfileToTechnology _ProfileToTechnology_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gdh
--

ALTER TABLE ONLY public."_ProfileToTechnology"
    ADD CONSTRAINT "_ProfileToTechnology_B_fkey" FOREIGN KEY ("B") REFERENCES public."Technology"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO "default";
GRANT CREATE ON SCHEMA public TO PUBLIC;
GRANT USAGE ON SCHEMA public TO gdh;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO gdh;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO gdh;


--
-- PostgreSQL database dump complete
--

