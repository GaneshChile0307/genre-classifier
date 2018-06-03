var conditions, actions, nameField, ageField, occupationField, submit, allData;
(function($) {
  var occupationOptions = [ "Software Engineer", "Biz Dev", "Marketing" ];

  function getInitialData() {
    return {
        'variables': [{
            'name': 'age',
            'label': 'Age',
            'field_type': 'numeric',
            'options': []
        }, {
            'name': 'descriptor',
            'label': 'Descriptors',
            'field_type': 'select_multiple',
            'options': ['sharp', 'smooth', 'rough', 'round', 'chaotic', 'patriotic', 'steady', 'hard', 'soft', 'simple', 'complex', 'hurried', 'leisurly', 'slow', 'edgy', 'grounded', 'grungy', 'upbeat', 'acoustical', 'homey', 'peppy', 'melodic', 'twangy', 'repetitive', 'bassheavy']
        }, {
            'name': 'distorted',
            'label': 'Distortion',
            'field_type': 'boolean',
            'options': []
        }, {
            'name': 'emotion',
            'label': 'Emotions',
            'field_type': 'select_multiple',
            'options': ['amazed', 'angry', 'annoyed', 'anxious', 'bored', 'confused', 'content', 'depressed', 'determined', 'energetic', 'happy', 'hurt', 'inspired', 'lost', 'loving', 'peaceful', 'proud', 'tense']
        }, {
            'name': 'felt_emot',
            'label': 'Felt Emotion',
            'field_type': 'select_multiple',
            'options': ['amazed', 'angry', 'annoyed', 'anxious', 'bored', 'confused', 'content', 'depressed', 'determined', 'energetic', 'happy', 'hurt', 'inspired', 'lost', 'loving', 'peaceful', 'proud', 'tense']
        }, {
            'name': 'instruments',
            'label': 'Instruments',
            'field_type': 'select_multiple',
            'options': ['piano', 'lead guitar', 'bass guitar', 'rhythm guitar', 'saxophone', 'drums', 'sythesizer', 'vocals', 'steel guitar', 'horns', 'violin']
        }, {
            'name': 'perc_emot',
            'label': 'Percieved Emotion',
            'field_type': 'select_multiple',
            'options': ['amazed', 'angry', 'annoyed', 'anxious', 'bored', 'confused', 'content', 'depressed', 'determined', 'energetic', 'happy', 'hurt', 'inspired', 'lost', 'loving', 'peaceful', 'proud', 'tense']
        }, {
            'name': 'performer_count',
            'label': 'Number of Performers',
            'field_type': 'numeric',
            'options': []
        }],
        'actions': [{
            'name': 'assign_genre',
            'label': 'Assign Genre',
            'params': [{
                'fieldType': 'select',
                'name': 'genre',
                'label': 'Genre',
                'options': [{
                    'label': 'Rock',
                    'name': 'rock'
                }, {
                    'label': 'Blues',
                    'name': 'blues'
                }, {
                    'label': 'Country',
                    'name': 'country'
                }, {
                    'label': 'Reggae',
                    'name': 'reggae'
                }, {
                    'label': 'Rap',
                    'name': 'rap'
                }, {
                    'label': 'Electronic',
                    'name': 'electronic'
                }, {
                    'label': 'World',
                    'name': 'world'
                }, {
                    'label': 'Classical',
                    'name': 'classical'
                }, {
                    'label': 'Folk',
                    'name': 'folk'
                }, {
                    'label': 'Pop',
                    'name': 'pop'
                }]
            }]
        }],
        'variable_type_operators': {
            'boolean': [{
                'name': 'is_false',
                'label': 'Is False',
                'input_type': 'none'
            }, {
                'name': 'is_true',
                'label': 'Is True',
                'input_type': 'none'
            }],
            'numeric': [{
                'name': 'equal_to',
                'label': 'Equal To',
                'input_type': 'numeric'
            }, {
                'name': 'greater_than',
                'label': 'Greater Than',
                'input_type': 'numeric'
            }, {
                'name': 'greater_than_or_equal_to',
                'label': 'Greater Than Or Equal To',
                'input_type': 'numeric'
            }, {
                'name': 'less_than',
                'label': 'Less Than',
                'input_type': 'numeric'
            }, {
                'name': 'less_than_or_equal_to',
                'label': 'Less Than Or Equal To',
                'input_type': 'numeric'
            }],
            'select_multiple': [{
                'name': 'contains_all',
                'label': 'Contains All',
                'input_type': 'select_multiple'
            }, {
                'name': 'is_contained_by',
                'label': 'Is Contained By',
                'input_type': 'select_multiple'
            }, {
                'name': 'shares_at_least_one_element_with',
                'label': 'Shares At Least One Element With',
                'input_type': 'select_multiple'
            }, {
                'name': 'shares_exactly_one_element_with',
                'label': 'Shares Exactly One Element With',
                'input_type': 'select_multiple'
            }, {
                'name': 'shares_no_elements_with',
                'label': 'Shares No Elements With',
                'input_type': 'select_multiple'
            }],
            'select': [{
                'name': 'contains',
                'label': 'Contains',
                'input_type': 'select'
            }, {
                'name': 'does_not_contain',
                'label': 'Does Not Contain',
                'input_type': 'select'
            }],
            'string': [{
                'name': 'contains',
                'label': 'Contains',
                'input_type': 'text'
            }, {
                'name': 'ends_with',
                'label': 'Ends With',
                'input_type': 'text'
            }, {
                'name': 'equal_to',
                'label': 'Equal To',
                'input_type': 'text'
            }, {
                'name': 'equal_to_case_insensitive',
                'label': 'Equal To (case insensitive)',
                'input_type': 'text'
            }, {
                'name': 'matches_regex',
                'label': 'Matches Regex',
                'input_type': 'text'
            }, {
                'name': 'non_empty',
                'label': 'Non Empty',
                'input_type': 'none'
            }, {
                'name': 'starts_with',
                'label': 'Starts With',
                'input_type': 'text'
            }]
        }
    };
  };

  function onReady() {
    conditions = $("#conditions");
    actions = $("#actions");
    nameField = $("#nameField");
    occupationField = $("#occupationField");
    ageField = $("#ageField");
    submit = $("#submit");
    allData = getInitialData();

    initializeConditions(allData);
    initializeActions(allData);
    initializeForm();
  }

  function initializeConditions(data) {
    conditions.conditionsBuilder(data)
  }

  function initializeActions(data) {
    actions.actionsBuilder(data);
  }

  function initializeForm() {
    for(var i=0; i < occupationOptions.length; i++) {
      var o = occupationOptions[i];
      occupationField.append($("<option>", {value: o.name, text: o.label}));
    }

    submit.click(function(e) {
      e.preventDefault();
      console.log("CONDITIONS");
      console.log(JSON.stringify(conditions.conditionsBuilder("data")));
      console.log("ACTIONS");
      console.log(JSON.stringify(actions.actionsBuilder("data")));
    });
  }
  $(onReady);
})(jQuery);
