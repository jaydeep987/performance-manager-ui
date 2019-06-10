export const en = {
  translation: {
    app: {
      title: 'Performance manager',
      welcome: 'Welcome',
    },
    pageHeadTitle: {
      login: 'Log In',
      home: 'Home',
      employeeManagement: 'Employee Management',
      adminReview: 'Review Management and Assignment',
      employeeFeedback: 'Reviews and Your Feedbacks',
      employeeReview: 'Review Assigned Employees',
      routeError: 'Error Loading Page',
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
      username: 'User name',
      password: 'Password',
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
    selectAssignedEmployeePopup: {
      popupTitle: 'Review Employee Assigned to you',
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
      feedback: {
        inputFeedbackTextFieldLabel: 'Give Feedback',
        inputFeedbackTextFieldPlaceholder: 'Input your feedback',
      },
    },
    assigneePopup: {
      title: 'Assignees',
      noAssignee: 'There are no assingees yet. Try to add some!',
    },
    employeeFeedback: {
      label: 'Following are reviews you got from other employees. Provide your feedback for all reviews.',
    },
    employeeReview: {
      button: {
        viewAssignedEmployees: 'View Assigned Employees',
      },
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
