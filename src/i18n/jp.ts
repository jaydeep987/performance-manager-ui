export const jp = {
  translation: {
    appTitle: 'パフォーマンスマネージャ',
    pageHeadTitle: {
      home: 'ホーム',
      counter: 'カウンター',
      employeeManagement: '社員管理',
      adminReview: 'レビュー管理または割当て',
      routeError: 'エラーが発生しました',
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
    reviews: {
      noReviewMessage: 'まだレビューはありません。 いくつか書いてみて！',
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
    },
    assigneePopup: {
      title: '譲受人',
      noAssignee: 'まだ誰も譲受人はありません。',
    },
    dashboard: {
      text: 'これはダッシュボードです！',
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
