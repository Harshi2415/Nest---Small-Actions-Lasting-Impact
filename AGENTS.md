# NEST — AI Development Rules

## Project

NEST is a community-driven environmental social platform.

Tagline:

"Small actions. Cleaner places. Bigger impact."

The platform allows users to:

* Share environmental small wins and ideas.
* Create, edit and delete their own posts.
* Appreciate posts.
* Comment and reply.
* View public profiles.
* Join teams.
* Participate in team activities.
* Track personal and collective environmental impact.
* Earn community recognition.
* Have real-time one-to-one text conversations.

## Technology

Frontend:

* React
* TypeScript
* Vite
* HTML
* Tailwind CSS
* React Router
* Redux Toolkit
* Axios
* Lucide React

Backend:

* Python
* FastAPI
* Pydantic
* SQLAlchemy
* Alembic
* WebSockets
* JWT authentication

Database:

* PostgreSQL

## Architecture

The repository contains:

frontend/
backend/

The backend API must use:

/api/v1/

Business logic must not depend directly on HTTP version prefixes.

Use separate:

* routers
* schemas
* database models
* services
* configuration
* authentication/security utilities

Frontend API calls must use a service layer.

Redux Toolkit should only manage genuinely shared application state.

Keep component-specific UI state inside React components.

## Design

NEST should feel:

* warm
* natural
* professional
* sophisticated
* welcoming
* community-oriented

Avoid:

* generic corporate dashboards
* excessive gradients
* excessive animations
* excessive green
* unnecessary complexity

The homepage must contain a scroll-driven hero story:

ONE → MANY → IMPACT

A single person performs a small environmental action.

As the visitor scrolls:

* more people appear
* more homes appear
* the neighborhood becomes greener
* the collective impact becomes visible

The animation should use lightweight React/CSS/SVG techniques rather than unnecessary 3D libraries.

## Features excluded from V1

Do NOT implement:

* fundraising
* donations
* fund providers
* payment processing
* video uploads
* voice calls
* video calls
* private profiles
* group chat

One-to-one real-time text chat IS required.

## Security

Never:

* store plaintext passwords
* commit secrets
* trust client-provided ownership information
* expose password hashes
* allow users to edit/delete another user's content
* allow unauthorized WebSocket conversation access

Validate important data on both frontend and backend.

## Database

Use proper:

* primary keys
* foreign keys
* unique constraints
* indexes where appropriate
* relationships
* migrations

Do not rely on automatic table creation for production.

## Impact calculations

Environmental impact must be clearly identified as an estimate.

Calculations must have documented assumptions.

Never present simulated environmental impact as independently verified real-world impact.

## Code quality

Prefer:

* small files
* readable functions
* reusable components
* clear naming
* minimal dependencies
* no unnecessary abstraction
* no duplicated code
* modular code
* simple code not complex 

Do not rewrite unrelated working code.

Before modifying existing code:

1. Inspect it.
2. Understand its role.
3. Make the smallest appropriate change.

After implementation:

1. Run relevant checks.
2. Report actual results.
3. Explain what changed.
4. Identify anything that remains unresolved.

Never claim a feature works unless it has actually been tested.
