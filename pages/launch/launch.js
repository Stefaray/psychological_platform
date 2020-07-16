Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    PageCur:"launch",
    elements: [{
        title: '发布问卷',
        name: 'questionnaire',
        color: 'mauve',
        icon: 'newsfill',
        path_name:'createQuestion'
      },
      {
        title: '发布实验',
        name: 'experiment',
        color: 'blue',
        icon: 'colorlens',
        path_name:'create_experiment'
      }
    ],
  }
})