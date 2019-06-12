## Assumptions

Given requirements are very basic. Trying to match requirements and my own thoughts about how system should be, I have made following assumptions:

- Only admin will add/update/delete employees
- Admin will assign some employee to participate in some selected employee's review process. Normal employees cannot assign others.
- Employees who got assigned to write review for others, will have list of assigned employees and they can select any of them to review.
- Employee view will have 2 pages:
  - List of employees which are assigned to him for review and there he can give reviews and also see old reviews with feedback
  - List of reviews he got from others where he can give as many feedback for each review as he want.
- Review can be editable by review provider only.
- Feedback can be editable by feedback giver only.
- For simplicity, admin or any employee who can give review to others, they can see reviews only which they gave. They cannot see reviews of others.
- Admin only can add/edit/delete assignees.
- Admins can get reviews from other admins or normal employees, and admin can give feedback.
