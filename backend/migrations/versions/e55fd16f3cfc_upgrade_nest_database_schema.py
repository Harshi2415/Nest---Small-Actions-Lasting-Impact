"""upgrade nest database schema

Revision ID: e55fd16f3cfc
Revises:
Create Date: 2026-10-08 15:49:30.689403

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e55fd16f3cfc"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # ---------------------------------------------------------
    # NEW TABLE: post_media
    # ---------------------------------------------------------

    op.create_table(
        "post_media",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("post_id", sa.Integer(), nullable=False),
        sa.Column("file_path", sa.String(length=500), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["post_id"],
            ["posts.id"],
            name="fk_post_media_post_id",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_post_media_id",
        "post_media",
        ["id"],
        unique=False,
    )

    # ---------------------------------------------------------
    # NEW TABLE: team_activities
    # ---------------------------------------------------------

    op.create_table(
        "team_activities",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("team_id", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("activity_date", sa.DateTime(), nullable=False),
        sa.Column("location", sa.String(length=250), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["team_id"],
            ["teams.id"],
            name="fk_team_activities_team_id",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_team_activities_id",
        "team_activities",
        ["id"],
        unique=False,
    )

    # ---------------------------------------------------------
    # NEW TABLE: impact_actions
    # ---------------------------------------------------------

    op.create_table(
        "impact_actions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("team_id", sa.Integer(), nullable=True),
        sa.Column("activity_id", sa.Integer(), nullable=True),
        sa.Column("action_type", sa.String(length=100), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("quantity", sa.Float(), nullable=True),
        sa.Column("unit", sa.String(length=50), nullable=True),
        sa.Column("impact_points", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
            name="fk_impact_actions_user_id",
        ),
        sa.ForeignKeyConstraint(
            ["team_id"],
            ["teams.id"],
            name="fk_impact_actions_team_id",
        ),
        sa.ForeignKeyConstraint(
            ["activity_id"],
            ["team_activities.id"],
            name="fk_impact_actions_activity_id",
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    op.create_index(
        "ix_impact_actions_id",
        "impact_actions",
        ["id"],
        unique=False,
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: comments
    # ---------------------------------------------------------

    op.add_column(
        "comments",
        sa.Column(
            "parent_id",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "comments",
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.add_column(
        "comments",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE comments "
        "SET created_at = CURRENT_TIMESTAMP "
        "WHERE created_at IS NULL"
    )

    op.execute(
        "UPDATE comments "
        "SET updated_at = CURRENT_TIMESTAMP "
        "WHERE updated_at IS NULL"
    )

    op.alter_column(
        "comments",
        "created_at",
        nullable=False,
    )

    op.alter_column(
        "comments",
        "updated_at",
        nullable=False,
    )

    op.create_foreign_key(
        "fk_comments_parent_id",
        "comments",
        "comments",
        ["parent_id"],
        ["id"],
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: likes
    # ---------------------------------------------------------

    op.add_column(
        "likes",
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE likes "
        "SET created_at = CURRENT_TIMESTAMP "
        "WHERE created_at IS NULL"
    )

    op.alter_column(
        "likes",
        "created_at",
        nullable=False,
    )

    op.create_unique_constraint(
        "uq_post_like",
        "likes",
        ["user_id", "post_id"],
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: posts
    # ---------------------------------------------------------

    op.add_column(
        "posts",
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.add_column(
        "posts",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE posts "
        "SET created_at = CURRENT_TIMESTAMP "
        "WHERE created_at IS NULL"
    )

    op.execute(
        "UPDATE posts "
        "SET updated_at = CURRENT_TIMESTAMP "
        "WHERE updated_at IS NULL"
    )

    op.alter_column(
        "posts",
        "created_at",
        nullable=False,
    )

    op.alter_column(
        "posts",
        "updated_at",
        nullable=False,
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: team_members
    # ---------------------------------------------------------

    op.add_column(
        "team_members",
        sa.Column(
            "message",
            sa.Text(),
            nullable=True,
        ),
    )

    op.add_column(
        "team_members",
        sa.Column(
            "joined_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE team_members "
        "SET joined_at = CURRENT_TIMESTAMP "
        "WHERE joined_at IS NULL"
    )

    op.alter_column(
        "team_members",
        "joined_at",
        nullable=False,
    )

    op.create_unique_constraint(
        "uq_team_member",
        "team_members",
        ["team_id", "user_id"],
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: teams
    # ---------------------------------------------------------

    op.add_column(
        "teams",
        sa.Column(
            "image",
            sa.String(length=500),
            nullable=True,
        ),
    )

    op.add_column(
        "teams",
        sa.Column(
            "created_by",
            sa.Integer(),
            nullable=True,
        ),
    )

    op.add_column(
        "teams",
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.add_column(
        "teams",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE teams "
        "SET created_at = CURRENT_TIMESTAMP "
        "WHERE created_at IS NULL"
    )

    op.execute(
        "UPDATE teams "
        "SET updated_at = CURRENT_TIMESTAMP "
        "WHERE updated_at IS NULL"
    )

    # Existing teams need an existing user as creator.
    op.execute(
        """
        UPDATE teams
        SET created_by = (
            SELECT id
            FROM users
            ORDER BY id
            LIMIT 1
        )
        WHERE created_by IS NULL
        """
    )

    op.alter_column(
        "teams",
        "created_at",
        nullable=False,
    )

    op.alter_column(
        "teams",
        "updated_at",
        nullable=False,
    )

    op.alter_column(
        "teams",
        "created_by",
        nullable=False,
    )

    op.create_foreign_key(
        "fk_teams_created_by",
        "teams",
        "users",
        ["created_by"],
        ["id"],
    )

    # ---------------------------------------------------------
    # EXISTING TABLE: users
    # ---------------------------------------------------------

    op.add_column(
        "users",
        sa.Column(
            "profile_image",
            sa.String(length=500),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "bio",
            sa.Text(),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.add_column(
        "users",
        sa.Column(
            "updated_at",
            sa.DateTime(),
            nullable=True,
        ),
    )

    op.execute(
        "UPDATE users "
        "SET created_at = CURRENT_TIMESTAMP "
        "WHERE created_at IS NULL"
    )

    op.execute(
        "UPDATE users "
        "SET updated_at = CURRENT_TIMESTAMP "
        "WHERE updated_at IS NULL"
    )

    op.alter_column(
        "users",
        "created_at",
        nullable=False,
    )

    op.alter_column(
        "users",
        "updated_at",
        nullable=False,
    )


def downgrade() -> None:
    """Downgrade schema."""

    # Remove foreign keys first.
    op.drop_constraint(
        "fk_teams_created_by",
        "teams",
        type_="foreignkey",
    )

    op.drop_constraint(
        "fk_comments_parent_id",
        "comments",
        type_="foreignkey",
    )

    # Remove users columns.
    op.drop_column("users", "updated_at")
    op.drop_column("users", "created_at")
    op.drop_column("users", "bio")
    op.drop_column("users", "profile_image")

    # Remove teams columns.
    op.drop_column("teams", "updated_at")
    op.drop_column("teams", "created_at")
    op.drop_column("teams", "created_by")
    op.drop_column("teams", "image")

    # Remove team member constraint and columns.
    op.drop_constraint(
        "uq_team_member",
        "team_members",
        type_="unique",
    )

    op.drop_column("team_members", "joined_at")
    op.drop_column("team_members", "message")

    # Remove post columns.
    op.drop_column("posts", "updated_at")
    op.drop_column("posts", "created_at")

    # Remove likes constraint and column.
    op.drop_constraint(
        "uq_post_like",
        "likes",
        type_="unique",
    )

    op.drop_column("likes", "created_at")

    # Remove comment columns.
    op.drop_column("comments", "updated_at")
    op.drop_column("comments", "created_at")
    op.drop_column("comments", "parent_id")

    # Remove new tables.
    op.drop_index(
        "ix_impact_actions_id",
        table_name="impact_actions",
    )
    op.drop_table("impact_actions")

    op.drop_index(
        "ix_team_activities_id",
        table_name="team_activities",
    )
    op.drop_table("team_activities")

    op.drop_index(
        "ix_post_media_id",
        table_name="post_media",
    )
    op.drop_table("post_media")