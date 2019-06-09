export const en = {
  translation: {
    appTitle: 'Performance manager',
    pageHeadTitle: {
      login: 'Log In',
      home: 'Home',
      counter: 'Counter',
      employeeManagement: 'Employee Management',
      adminReview: 'Review Management and Assignment',
      routeError: 'Error loading page',
    },
    menus: {
      admin: {
        employee: 'Employee',
        review: 'Review',
      },
      normal: {
        assignedToYou: 'Assigned to you',
        feedback: 'Feedback',
      },
    },
    login: {
      loginButton: 'Login',
    },
    employeeManagement: {
      tableTitle: 'Employees',
      deleteMissingId: 'Cannot delete user as ID is missing',
      tableColumns: {
        firstName: 'First Name',
        lastName: 'Last Name',
        gender: 'Gender',
        userName: 'User Name',
        role: 'Role',
        password: 'Password',
      },
    },
    adminReview: {
      button: {
        selectEmployee: 'Select Employee',
        viewAssignees: 'View Assignees',
      },
    },
    selectEmployeePopup: {
      popupTitle: 'Select Employee',
      button: {
        cancel: 'Cancel',
      },
    },
    reviews: {
      noReviewMessage: 'There are no reviews yet. Try adding new!',
      reviewsOfLabel: 'Showing Reviews of: {{whom}}',
      formDialogTitle: 'Review',
      buttons: {
        addReview: 'Add New Review',
      },
      form: {
        writeReviewPlaceholder: 'Write a review',
        submitButton: 'Submit',
        cancelButton: 'Cancel',
      },
    },
    assigneePopup: {
      title: 'Assignees',
      noAssignee: 'There are no assingees yet. Try to add some!',
    },
    dashboard: {
      text: 'This is dashboard',
    },
    routeError: {
      text: 'There was some error while loading page. Please try again',
    },
    errorMessage: {
      systemError: 'System error occurred. Contact admin',
      unauthorizedAccess: 'You are not authorized to access this content',
      wrongLoginCredentials: 'Username or password provided is wrong',
      internalError: 'There was some internal error occcurred. Contact admin',
      badRequest: 'There was some error in request',
      notFound: 'Provided resource or record not found',
    },
  },
};
