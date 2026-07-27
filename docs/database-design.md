# Database Design

## Database

MongoDB Atlas

Database Name:

```
quillmind
```

---

# Collections

## Users

| Field | Type |
|--------|------|
| _id | ObjectId |
| name | String |
| email | String |
| password | String |
| avatar | String |
| createdAt | Date |
| updatedAt | Date |

---

## Blogs

| Field | Type |
|--------|------|
| _id | ObjectId |
| title | String |
| slug | String |
| content | String |
| excerpt | String |
| coverImage | String |
| author | ObjectId |
| tags | Array |
| status | String |
| readingTime | Number |
| seoTitle | String |
| seoDescription | String |
| createdAt | Date |
| updatedAt | Date |

---

## Relationship

```
User (1)
   │
   │ creates
   ▼
Blog (Many)
```

One user can create multiple blogs.

Each blog belongs to one user.

---

## ER Diagram

```
+------------------+
|      User        |
+------------------+
| _id              |
| name             |
| email            |
| password         |
+------------------+
        │
        │ 1
        │
        │
        │ *
+------------------+
|      Blog        |
+------------------+
| _id              |
| title            |
| slug             |
| content          |
| author           |
+------------------+
```