export const jp = {
  translation: {
    app: {
      title: 'パフォーマンスマネージャ',
      welcome: 'ようこそ',
    },
    pageHeadTitle: {
      home: 'ホーム',
      employeeManagement: '社員管理',
      adminReview: 'レビュー管理または割当て',
      routeError: 'エラーが発生しました',
      employeeFeedback: 'あなたのレビューまたはフィードバック',
      employeeReview: '割り当てられた社員にレビュー書きましょう',
    },
    menus: {
      admin: {
        employee: '社員管理',
        review: 'レビュー',
      },
      normal: {
        assignedToYou: 'あなたに割り当てられた',
        feedback: 'フィードバック',
      },
    },
    login: {
      loginButton: 'ログイン',
      username: 'ユーザー名',
      password: 'パスワード',
    },
    employeeManagement: {
      tableTitle: '社員データ',
      deleteMissingId: 'IDが設定されていないので削除出来ません。',
      tableColumns: {
        firstName: '名',
        lastName: '姓',
        gender: '性別',
        userName: 'ユーザー名',
        role: '役割',
        password: 'パスワード',
      },
    },
    adminReview: {
      button: {
        selectEmployee: '社員を選択',
        viewAssignees: '譲受人を表示',
      },
    },
    selectEmployeePopup: {
      popupTitle: '社員を選択',
      button: {
        cancel: 'キャンセル',
      },
    },
    selectAssignedEmployeePopup: {
      popupTitle: 'あなたに割り当てられた社員',
      button: {
        cancel: 'キャンセル',
      },
    },
    reviews: {
      noReviewMessage: 'まだレビューはありません。',
      reviewsOfLabel: '{{whom}}のレビュー：',
      formDialogTitle: 'レビュー',
      buttons: {
        addReview: 'レビューを書く',
      },
      form: {
        writeReviewPlaceholder: 'レビュー書いてください',
        submitButton: '書く',
        cancelButton: 'キャンセル',
      },
      feedback: {
        inputFeedbackTextFieldLabel: 'フィードバック',
        inputFeedbackTextFieldPlaceholder: 'フィードバック入力',
      },
    },
    assigneePopup: {
      title: '譲受人',
      noAssignee: 'まだ誰も譲受人はありません。',
    },
    employeeFeedback: {
      label: '以下は、あなたが他の社員からもらったレビューです。 すべてのレビューについてご意見をお寄せください。',
    },
    employeeReview: {
      button: {
        viewAssignedEmployees: '割り当てられた社員',
      },
    },
    routeError: {
      text: 'ページがロードする時にエラーが発生しました。再試行してください。',
    },
    errorMessage: {
      systemError: 'システムエラーが発生しました。',
      unauthorizedAccess: 'あなたはこのコンテンツにアクセスする権限がありません。',
      wrongLoginCredentials: '提供されたユーザー名またはパスワードが違います。',
      internalError: '内部エラーが発生しました。',
      badRequest: 'リクエストにエラーがありました。',
      notFound: '提供されたリソースまたはレコードが見つかりません。',
    },
  },
};
