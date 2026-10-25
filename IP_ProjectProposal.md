# Software Requirements Specification: UniSwap — University Second-Hand Marketplace

Version 1.0 | Individual course project | Author: Rasmey Rithysak | Date: October 25, 2026

Repository: https://github.com/rasmeyrithysak/IP_UniSwap_Rithysak.git

## 1. Introduction

### 1.1 Purpose

This document specifies the requirements for UniSwap, a full-stack web application that allows university students to buy and sell second-hand items within their university community. It serves as the detailed requirements document for the individual course project. The proposal summarises the project, while this document defines its functionality, constraints, data model, implementation plan and testing requirements.

The project is scoped to deliver a working minimum viable product (MVP) first. Features that are not necessary for the core buying-and-selling workflow are excluded from the first release.

### 1.2 Problem statement

University students often need to buy affordable textbooks, stationery, electronics and other student-related items. At the same time, students may have unwanted items that could be useful to other students. These transactions are often arranged through informal chats or social media posts, making listings difficult to organise and find.

UniSwap provides a central marketplace where students can create listings, browse available items, view item details and save interesting listings to their favourites. The system also allows administrators to moderate listings when necessary.

### 1.3 Scope

The MVP focuses on the essential marketplace workflow:

- Users register, log in and log out.
- Users create, edit and delete their own listings.
- Users browse listings and filter them by category.
- Users view listing details, including the title, description, price and seller.
- Users add listings to and remove listings from their favourites.
- Sellers mark their own listings as available or sold.
- Administrators review and remove inappropriate listings.
- The backend enforces authentication, authorisation and listing ownership.

Messaging between buyers and sellers and image uploads are excluded from the first release. The first version will use a simple text-based listing presentation so the main marketplace workflow can be completed and tested within the available time.

Online payments, delivery management, ratings and reviews, real-time notifications, and mobile applications are also out of scope.

### 1.4 Definitions

| Term | Meaning |
|---|---|
| UniSwap | The university second-hand marketplace application |
| User | A registered person using the marketplace |
| Listing | An item advertised for sale by a user |
| Seller | A user who creates and manages a listing |
| Category | A classification used to organise listings |
| Favourite | A saved listing associated with a user's account |
| Administrator | A user with permission to moderate listings |
| MVP | Minimum viable product; the smallest useful version of the system |
| SPA | Single-page application |
| REST API | An HTTP interface used by the frontend to communicate with the backend |
| ORM | Object-relational mapping; a tool for working with a relational database |
| DTO | Data transfer object used to define and validate request data |

### 1.5 Document overview

Section 2 describes the product, its users, operating environment and constraints. Section 3 defines the user stories, functional requirements, business rules, interfaces and non-functional requirements. Section 4 describes the data model and data rules. Section 5 covers the MVP, implementation order, stretch feature, API contract, milestones and risks. Appendix A provides traceability between user stories and functional requirements.

## 2. Overall Description

### 2.1 Product perspective

UniSwap is a new, standalone three-tier web application.

The frontend is a Vue 3 single-page application that communicates with a NestJS REST API. The backend handles business rules, authentication, authorisation and data validation. PostgreSQL stores the application's persistent data, accessed through Prisma.

The application is designed for use through a modern web browser. The frontend and backend are developed in TypeScript to improve consistency and maintainability.

### 2.2 Product functions (summary)

- User registration, login and logout.
- Creation, viewing, editing and deletion of listings.
- Browsing listings and filtering by category.
- Viewing individual listing details.
- Adding and removing favourites.
- Marking personal listings as available or sold.
- Administrator moderation of listings.
- Authentication, role checks and ownership validation.
- Persistent storage of users, categories, listings and favourites.

### 2.3 User classes

| Role | Description | Main permissions |
|---|---|---|
| Visitor | A person who has not logged in | Register and log in |
| Registered user | A student using the marketplace | Browse listings, view details, manage own listings and favourites |
| Administrator | A user with moderation permissions | Review and remove inappropriate listings |

The system has two account roles: USER and ADMIN. Public registration always creates a USER account. Administrator privileges are assigned through a controlled setup process and cannot be obtained by changing a role in the registration request.

### 2.4 Operating environment

The frontend runs in modern desktop and mobile web browsers. The backend and database run locally during development and can be deployed to a compatible server environment.

Development and testing use Node.js, npm, PostgreSQL and the selected TypeScript frameworks. Docker Compose may be used to simplify running the application and its database.

### 2.5 Constraints

- Frontend: Vue 3, TypeScript, Vite, Vue Router and Pinia.
- Backend: NestJS, TypeScript and REST endpoints.
- Database: PostgreSQL.
- Database access: Prisma ORM and migrations.
- Authentication: password hashing and JSON Web Tokens (JWT).
- Validation: server-side request validation and appropriate HTTP status codes.
- Version control: one Git repository for the individual project.
- Security: secrets must be stored in environment variables and not committed to the repository.
- Scope: the MVP must be completed before attempting optional enhancements.

### 2.6 Assumptions and dependencies

- The initial target audience is students within one university community.
- Users have access to a modern web browser and an Internet connection or the local development environment.
- Users arrange payment and item handover independently; UniSwap does not process transactions.
- Each listing belongs to one user and one category.
- The application uses a predefined set of categories that can be maintained by an administrator or seeded during setup.
- The first release uses text-based listings without user-uploaded images.
- Listing removal by an administrator is restricted to moderation purposes.
- The project uses the specified JavaScript and TypeScript frameworks and a PostgreSQL database.
- A working development environment and database are available before integration testing begins.

## 3. Specific Requirements

### 3.1 User stories

1. As a visitor, I want to register and log in so that I can use the marketplace and manage my own activity.

   **Accepted when:**
   - Registration requires a name, a valid email address and a password that meets the minimum password-length rule.
   - The system rejects an email address that is already registered.
   - Passwords are stored as secure hashes rather than plain text.
   - Successful login provides an authenticated session or token.
   - Invalid credentials return a clear error without revealing sensitive information.
   - Public registration always creates a USER account.

2. As a registered user, I want to create a listing so that I can offer an unwanted item to other students.

   **Accepted when:**
   - A listing requires a title, description, price and category.
   - The server validates required fields and rejects invalid prices.
   - A new listing is associated with the currently authenticated user.
   - The listing is stored in the database and appears in the marketplace.
   - A user cannot create a listing on behalf of another user by submitting a different seller ID.

3. As a registered user, I want to browse listings and filter them by category so that I can find relevant items.

   **Accepted when:**
   - The listing page displays available listings with their basic information.
   - A user can select a category to filter the displayed listings.
   - Listings outside the selected category are not included in the filtered results.
   - A listing's detail page displays its title, description, price, category, seller and status.
   - An empty result displays a clear message rather than a blank or broken page.
   - The system displays loading and error states when retrieving listings.

4. As a seller, I want to edit or delete my own listing so that I can keep its information accurate.

   **Accepted when:**
   - The owner can update the title, description, price and category.
   - The owner can delete their own listing.
   - A user who does not own a listing cannot edit or delete it.
   - Requests without authentication are rejected.
   - Successful changes are saved in the database and reflected in the interface.

5. As a registered user, I want to save listings to my favourites so that I can find interesting items again.

   **Accepted when:**
   - An authenticated user can add a listing to their favourites.
   - The same listing cannot be duplicated in that user's favourites.
   - The user can view their own favourites.
   - The user can remove a listing from their favourites.
   - One user cannot view or modify another user's favourites.

6. As a seller, I want to mark my listing as sold or available so that its status reflects whether it can still be purchased.

   **Accepted when:**
   - The listing owner can change the listing status between AVAILABLE and SOLD.
   - Only the owner or an authorised administrator can change the status.
   - The status is persisted in the database.
   - The interface clearly distinguishes sold listings from available listings.
   - A user cannot change the status by submitting a request for another user's listing.

7. As an administrator, I want to review and remove inappropriate listings so that the marketplace remains suitable for the university community.

   **Accepted when:**
   - An administrator can retrieve listings for moderation.
   - An administrator can remove a listing that violates marketplace rules.
   - A normal user cannot access administrator-only endpoints.
   - Moderation actions return an appropriate success or error response.
   - Invalid listing identifiers return a not-found response.

8. As a registered user, I want to view and manage my own listings so that I can keep track of the items I am selling.

   **Accepted when:**
   - The system displays listings belonging to the authenticated user.
   - The list includes each listing's title, price and status.
   - The user cannot retrieve another user's private management view by changing a user ID in the request.
   - Empty and error states are displayed clearly.

### 3.2 Functional requirements

| ID | Requirement | Story | Priority |
|---|---|---|---|
| FR-1 | The system shall allow visitors to register with a name, email and password, and reject duplicate email addresses. | 1 | Must |
| FR-2 | The system shall hash passwords and shall never store or return plain-text passwords. | 1 | Must |
| FR-3 | The system shall authenticate registered users and issue a JWT or equivalent authentication token. | 1 | Must |
| FR-4 | The system shall enforce USER and ADMIN roles on protected backend endpoints. | 1, 7 | Must |
| FR-5 | The system shall allow authenticated users to create listings containing a title, description, price and category. | 2 | Must |
| FR-6 | The system shall associate each newly created listing with the authenticated user. | 2 | Must |
| FR-7 | The system shall display listings and allow users to filter them by category. | 3 | Must |
| FR-8 | The system shall provide a detail view containing the listing's title, description, price, category, seller and status. | 3 | Must |
| FR-9 | The system shall allow a listing owner to edit their own listing. | 4 | Must |
| FR-10 | The system shall allow a listing owner to delete their own listing. | 4 | Must |
| FR-11 | The system shall reject attempts by users to edit or delete listings they do not own, unless the user is an authorised administrator. | 4, 7 | Must |
| FR-12 | The system shall allow authenticated users to add listings to and remove listings from their favourites. | 5 | Must |
| FR-13 | The system shall prevent duplicate favourite records for the same user and listing. | 5 | Must |
| FR-14 | The system shall allow users to retrieve their own favourite listings without exposing another user's favourites. | 5 | Must |
| FR-15 | The system shall allow listing owners to change their listing status between AVAILABLE and SOLD. | 6 | Must |
| FR-16 | The system shall allow administrators to retrieve listings for moderation and remove inappropriate listings. | 7 | Must |
| FR-17 | The system shall provide a view of the authenticated user's own listings. | 8 | Must |
| FR-18 | The system shall validate incoming data on the server and return consistent error responses for invalid requests. | All | Must |
| FR-19 | The system shall display loading, empty and error states on data-driven pages. | All | Must |
| FR-20 | The system shall prevent public registration from assigning ADMIN privileges. | 1, 7 | Must |
| FR-21 | The system shall support user-uploaded listing images. | — | Could; excluded from MVP |
| FR-22 | The system shall provide buyer-seller messaging. | — | Could; excluded from MVP |

### 3.3 Business rules

| ID | Rule |
|---|---|
| BR-1 | Every listing must belong to one registered user. |
| BR-2 | Every listing must belong to one category. |
| BR-3 | A listing's price must be a valid non-negative monetary amount. |
| BR-4 | A listing can have the status AVAILABLE or SOLD. |
| BR-5 | Only the listing owner or an authorised administrator may modify or remove a listing. |
| BR-6 | A registered user can manage only their own favourites. |
| BR-7 | The same user cannot favourite the same listing more than once. |
| BR-8 | Public registration always creates a USER account; administrator privileges cannot be assigned through public registration. |
| BR-9 | Authentication and ownership checks must be enforced by the backend, not only by the frontend. |
| BR-10 | Messaging, online payments and image uploads are not required for the MVP. |

### 3.4 External interface requirements

**User interface.** The frontend is a responsive Vue application with a simple layout. The MVP includes a home/listing page, registration and login pages, a listing detail page, a form for creating and editing listings, a user's listings page and a favourites page. Administrator users have access to a basic moderation view.

The interface should provide clear form validation, loading indicators, empty states and error messages. The first release does not require real-time messaging, advanced animations or image-upload controls.

**Software interfaces.** The frontend communicates with the NestJS REST API using JSON over HTTP during local development and HTTPS in a production deployment. The backend accesses PostgreSQL through Prisma. API routes should follow a consistent naming convention, and request data must be validated before database operations.

**Error format.** The API returns appropriate HTTP status codes and a consistent error structure. For example:

```json
{
  "statusCode": 400,
  "message": ["Price must be a valid non-negative number"],
  "error": "Bad Request"
}
```

Expected status codes include 200 for successful retrieval or updates, 201 for successful creation, 204 for successful deletion where appropriate, 400 for invalid input, 401 for unauthenticated requests, 403 for forbidden actions, 404 for missing resources and 409 for conflicts such as duplicate registration.

### 3.5 Non-functional requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-1 | Security | Passwords shall be hashed before storage and shall never be exposed through API responses. |
| NFR-2 | Security | Protected endpoints shall reject missing or invalid authentication tokens with 401 responses. |
| NFR-3 | Security | The backend shall enforce roles and resource ownership for listing, favourite and moderation operations. |
| NFR-4 | Security | Environment secrets shall not be committed to the repository; an example environment file may document required variables without real secrets. |
| NFR-5 | Reliability | Listing, favourite and status changes shall be persisted correctly in PostgreSQL. |
| NFR-6 | Performance | Common listing retrieval and category-filter requests should respond within 2 seconds under normal development-scale usage. |
| NFR-7 | Usability | Forms shall show validation feedback, and data-driven pages shall have loading, empty and error states. |
| NFR-8 | Maintainability | The project shall use TypeScript, a consistent code structure and clear separation between frontend, backend and database responsibilities. |
| NFR-9 | Testability | Authentication, listing ownership, category filtering, favourite uniqueness and listing status changes shall be tested. |
| NFR-10 | Portability | The application shall include documented setup instructions so it can be run in another compatible development environment. |
| NFR-11 | Documentation | The repository shall include a README describing the project, setup, environment variables, database migrations and test instructions. |

## 4. Data Requirements

### 4.1 Entities

| Entity | Main attributes | Relations |
|---|---|---|
| User | id, name, email, passwordHash, role, createdAt | Has many Listings and Favorites |
| Category | id, name, description | Has many Listings |
| Listing | id, userId, categoryId, title, description, price, status, createdAt, updatedAt | Belongs to one User and one Category; has many Favorites |
| Favorite | id, userId, listingId, createdAt | Belongs to one User and one Listing |

Relations in summary: User 1-N Listing, Category 1-N Listing, User 1-N Favorite and Listing 1-N Favorite.

The MVP does not require a separate ListingImage entity because image uploads are excluded from the first release. If image uploads are approved as the stretch feature, the data model can be extended to represent image metadata and its relationship to a listing.

### 4.2 Data rules

- Every user must have a unique email address.
- Passwords must be stored as hashes, never as plain text.
- Every listing must reference an existing user and category.
- The listing price must be stored using a suitable decimal or fixed-precision numeric type rather than an imprecise floating-point type.
- A listing's status must be restricted to the supported values AVAILABLE and SOLD.
- Each favourite must reference an existing user and listing.
- A database uniqueness constraint must prevent duplicate favourites for the same user and listing.
- Foreign-key constraints must prevent invalid references between entities.
- Deleting a listing must not leave orphaned favourite records.
- Database changes must be managed through Prisma migrations.
- A seed script should create the initial categories and optional development test accounts without committing real credentials.

### 4.3 Data integrity and access control

**Listing ownership.** When a user creates a listing, the backend derives the owner from the authenticated user's identity. It must not trust a seller ID supplied by the frontend. Before editing, deleting or changing a listing's status, the backend verifies that the user owns the listing or has administrator permission.

**Favourite uniqueness.** The database should enforce a unique constraint on the combination of `userId` and `listingId`. This prevents duplicate favourite records even if two requests are submitted close together.

**Referential integrity.** Listing records reference users and categories through foreign keys. Favourite records reference users and listings. Database constraints and appropriate deletion behaviour should maintain consistent relationships.

**Role security.** Public registration cannot create an administrator account. Administrator privileges must be assigned through a controlled setup process. Hiding an administrator button in the frontend is not sufficient; the backend must check the user's role for every protected moderation operation.

**Validation.** The backend validates required fields, email format, price, category references and supported status values. Invalid input must be rejected before it is saved to the database.

### 4.4 Authentication and authorisation rules

- A user must authenticate before creating, editing or deleting a listing.
- A user must authenticate before managing favourites.
- Users may update or delete only their own listings unless they have administrator permission.
- Users may view and manage only their own favourites.
- Administrator-only endpoints must reject normal USER accounts with a 403 response.
- Requests without a valid token must be rejected with a 401 response.
- The backend must derive the current user's identity from the validated authentication token.
- Passwords and authentication secrets must not be included in normal API responses or application logs.

## 5. Project Scope and Plan

### 5.1 MVP scope

The MVP includes user registration and login, listing creation and management, listing browsing and category filtering, listing detail pages, favourites, listing status management, basic administrator moderation and backend access control.

The eight user stories in Section 3.1 define the MVP workflow. Features not required to complete that workflow will not be implemented until the core functionality is working and tested.

Messaging, image uploads, online payments, delivery management, ratings and reviews, and real-time notifications are excluded from the first release.

### 5.2 Build order

| Phase | Goal | What to build |
|---|---|---|
| 1. Foundation | Establish a working project structure | Set up the repository, Vue application, NestJS API, PostgreSQL connection, Prisma schema and environment configuration |
| 2. Authentication | Secure access to the application | Implement registration, login, password hashing, token handling and protected routes |
| 3. Core listings | Complete the main marketplace workflow | Implement listing creation, listing retrieval, detail pages, editing, deletion and category filtering |
| 4. User features | Complete basic account activity | Implement favourites, the user's listings page and AVAILABLE/SOLD status management |
| 5. Administration and testing | Protect and validate the MVP | Implement moderation permissions, ownership checks, validation, automated tests and error states |
| 6. Delivery | Prepare the final project | Complete the README, verify setup instructions, run tests and prepare the demonstration |

Each phase should leave the application in a runnable state. Optional work must not delay the completion of authentication, listing management, favourites or security checks.

### 5.3 Stretch feature

**Stretch feature: Search, filter and pagination.**

Users can search for listings by title, filter listings by category, and browse results across multiple pages, with 10 listings per page.

The search and filtering functionality will be implemented through query parameters on `GET /listings`, such as `search`, `categoryId` and `page`. The backend will return the matching listings for the requested page, and the frontend will provide search input, category selection and pagination controls.

The system will display a clear message when no listings match the search criteria. Search, filtering and pagination must work together correctly.

This feature is selected because it directly improves the core marketplace experience and is achievable within the project timeline. It will be implemented after the core MVP functionality is working and tested.

### 5.4 API contract (draft)

| Method | Path | Who can call | Request body | Success | Errors |
|---|---|---|---|---|---|
| POST | `/auth/register` | Anyone | `{ name, email, password }` | 201 | 400, 409 |
| POST | `/auth/login` | Anyone | `{ email, password }` | 200 | 400, 401 |
| GET | `/categories` | Anyone | — | 200 | — |
| GET | `/listings?categoryId=&page=` | Anyone | — | 200 | 400 |
| GET | `/listings/:id` | Anyone | — | 200 | 404 |
| POST | `/listings` | Authenticated user | `{ title, description, price, categoryId }` | 201 | 400, 401, 404 |
| PATCH | `/listings/:id` | Owner or admin | `{ title?, description?, price?, categoryId? }` | 200 | 400, 401, 403, 404 |
| DELETE | `/listings/:id` | Owner or admin | — | 204 | 401, 403, 404 |
| PATCH | `/listings/:id/status` | Owner or admin | `{ status }` | 200 | 400, 401, 403, 404 |
| POST | `/favorites` | Authenticated user | `{ listingId }` | 201 | 400, 401, 404, 409 |
| GET | `/favorites/mine` | Authenticated user | — | 200 | 401 |
| DELETE | `/favorites/:listingId` | Authenticated user | — | 204 | 401, 404 |
| GET | `/users/me/listings` | Authenticated user | — | 200 | 401 |
| GET | `/admin/listings` | Admin | — | 200 | 401, 403 |
| DELETE | `/admin/listings/:id` | Admin | — | 204 | 401, 403, 404 |

The API contract is a draft and may be refined during implementation. All endpoints must validate incoming data and enforce the access rules defined in Sections 3 and 4. Pagination parameters may be introduced for listing retrieval if needed to keep results manageable.

### 5.5 Milestones

| Week | Milestone | Deliverable |
|---|---|---|
| 3 | M0 Proposal | Project proposal and requirements specification |
| 5 | M1 Frontend prototype | Main pages, navigation, reusable components and form validation using mock data |
| 7 | M2 Backend foundation | Database schema, Prisma migrations, seed data and initial REST endpoints |
| 9 | M3 Integrated authentication and listings | Registration, login, protected endpoints and core listing CRUD connected to the database |
| 12 | M4 MVP feature complete | Category filtering, favourites, listing status, moderation and required tests |
| 14 | M5 Final testing and deployment preparation | Bug fixes, setup documentation, verification of the application in a clean environment |
| 16 | Final defence | Working demonstration, architecture explanation and code walkthrough |

The schedule is a planning baseline. The MVP takes priority over optional enhancements, and the stretch feature will be started only when the core requirements have been implemented and tested.

### 5.6 Risks

| Risk | Mitigation |
|---|---|
| The project becomes too large for one developer | Keep the MVP focused on the eight core user stories and defer messaging and image uploads |
| Authentication or role checks are implemented only in the frontend | Enforce authentication, role permissions and ownership checks in the backend |
| Users can modify other users' listings | Derive identity from the authenticated token and verify ownership for every protected operation |
| Duplicate favourites are created | Enforce uniqueness on the user-listing pair in the database |
| Invalid or inconsistent data enters the database | Validate request DTOs and use database constraints and Prisma migrations |
| Frontend and backend integration takes longer than expected | Define the API contract early and integrate one feature at a time |
| The selected stretch feature is too complex | Choose exactly one teacher-approved option and implement it only after the MVP is stable |
| Development works only on the original machine | Document environment variables, database setup, migrations and start commands in the README |

## Appendix A. Traceability

| Story | Requirements |
|---|---|
| 1 | FR-1, FR-2, FR-3, FR-4, FR-20 |
| 2 | FR-5, FR-6 |
| 3 | FR-7, FR-8, FR-18, FR-19 |
| 4 | FR-9, FR-10, FR-11 |
| 5 | FR-12, FR-13, FR-14 |
| 6 | FR-15, FR-18 |
| 7 | FR-4, FR-16, FR-20 |
| 8 | FR-17, FR-18 |
