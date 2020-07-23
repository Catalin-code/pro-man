// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

export let dom = {
    init: function () {
        document.querySelector('#addBoard').addEventListener('click', this.createBoard)
        $('body').on('click', '[id^="addCard"]', ev => {
          let board_id = ev.currentTarget.getAttribute('id').replace('addCard', '') 
          let title = document.getElementById(`cardName${board_id}`).value;
          dataHandler.createNewCard(board_id,title, function(response) {
            let cardsContainer = document.querySelector(`#newCards${board_id}`);
            let card = `
                <p class="draggable" draggable="true"> ${response.title} </p>
              `;
            cardsContainer.insertAdjacentHTML('beforeend',card)
          })
          console.log('pressed')
          this.loadBoards()
        })
    },

    debug: function() {
      console.log('tested')
    },

    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function(boards){
          dom.showBoards(boards)
        });
        dataHandler.getCards(function(cards){
          dom.loadCards(cards)
        });
        
    },
    createBoard: function() {
        let title = document.getElementById('boardName').value;
        dataHandler.createNewBoard(title, function(response) {
          let boardsContainer = document.querySelector('#boards');
          let board = `
            <!--Accordion wrapper-->
            <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
        
              <!-- Accordion card -->
              <div class="card">
        
                <!-- Card header -->
                <div class="card-header" role="tab" id="heading${response.id}">
                  <div class="d-inline-block">
                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapse${response.id}" aria-expanded="true"
                      aria-controls="collapse${response.id}">
                      <h5 class="mb-0">
                      ${response.title} <i class="fas fa-angle-down rotate-icon"></i>
                      </h5>
                    </a>
                  </div>
                  <div class="float-right">
                    <input type="text" placeholder="enter card title" id = "cardName${response.id}">
                    <input type="button" class="btn btn-success" value="Add Card" id="addCard${response.id}" data-boardId ="${response.id}">
                  </div>
                </div>
        
                <!-- Card body -->
                <div id="collapse${response.id}" class="collapse" role="tabpanel" aria-labelledby="heading${response.id}"
                  data-parent="#accordionEx">
                  <div class="card-body">
                  <div class="container card-container">
                  <div class="row my-row">
                    <div class="card my-card">
                      <div class="card-header">
                        New
                      </div>
                      <div class="card-body drag-container" id="newCards${response.id}">

                      </div>
                    </div>
                    <div class="card my-card">
                      <div class="card-header">
                        In-progress
                      </div>
                      <div class="card-body drag-container">
      
                      </div>
                    </div>
                    <div class="card my-card">
                      <div class="card-header">
                        Testing
                      </div>
                      <div class="card-body drag-container">
      
                      </div>
                    </div>
                    <div class="card my-card">
                      <div class="card-header">
                        Done
                      </div>
                      <div class="card-body drag-container">
      
                      </div>
                    </div>
              </div>

                  </div>
                </div>
        
              </div>
              <!-- Accordion card -->
            `;
            boardsContainer.insertAdjacentHTML('beforeend',board)
        })
    },

    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){               
            boardList += `
            <!-- Accordion wrapper -->
            <div class="accordion md-accordion" id="accordionEx" role="tablist" aria-multiselectable="true">
        
              <!-- Accordion card -->
              <div class="card">
          
                <!-- Card header -->
                <div class="card-header" role="tab" id="heading${board.id}">
                  <div class="d-inline-block">
                    <a data-toggle="collapse" data-parent="#accordionEx" href="#collapse${board.id}" aria-expanded="true"
                      aria-controls="collapse${board.id}">
                      <h5 class="mb-0">
                      ${board.title} <i class="fas fa-angle-down rotate-icon"></i>
                      </h5>
                    </a>
                  </div>
                  <div class="float-right">
                    <input type="text" placeholder="enter card title" id = "cardName${board.id}">
                    <input type="button" class="btn btn-success" value="Add Card" id="addCard${board.id}" data-boardId ="${board.id}">
                  </div>
                </div>
          
                <!-- Card body -->
                <div id="collapse${board.id}" class="collapse" role="tabpanel" aria-labelledby="heading${board.id}"
                  data-parent="#accordionEx">
                  <div class="card-body">
                    <div class="container card-container">
                      <div class="row my-row">
                        <div class="card my-card">
                          <div class="card-header">
                            New
                          </div>
                          <div class="card-body drag-container" id="newCards${board.id}">

                          </div>
                        </div>
                        <div class="card my-card">
                          <div class="card-header">
                            In-progress
                          </div>
                          <div class="card-body drag-container">
          
                          </div>
                        </div>
                        <div class="card my-card">
                          <div class="card-header">
                            Testing
                          </div>
                          <div class="card-body drag-container">
          
                          </div>
                        </div>
                        <div class="card my-card">
                          <div class="card-header">
                            Done
                          </div>
                          <div class="card-body drag-container">
          
                          </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
            `;
        }

        let boardsContainer = document.querySelector('#boards');
        boardsContainer.innerHTML = boardList
    },
    loadCards: function (cardList) {
        // retrieves cards and makes showCards called
        dataHandler.getCards(function(cardList){
          let boardIds = []
          for (let card of cardList){
            if ( !boardIds.includes(card.board_id) ){
              boardIds.push(card.board_id)
            }
          }
          for (let element of boardIds) {
            let cards = cardList.filter(card => card.board_id == element);
            dom.showCards(cards,element);
          }
          dom.makeDraggable();
      });
    },
    showCards: function (cards, board_id) {
        // shows the cards of a board
        // it adds necessary event listeners also
        let cardList = ''
        let boardId = cards[0].board_id
        for (let card of cards) {
          if (card.board_id === boardId) {
          cardList += `
          <p class="draggable" draggable="true"> ${card.title}</p>
          `
        } else {
          let cardsContainer = document.querySelector(`#newCards${board_id}`)
          cardsContainer.innerHTML = cardList
          cardList = ''
        }

        }
        if (cardList != '') {
          let cardsContainer = document.querySelector(`#newCards${board_id}`)
          cardsContainer.innerHTML = cardList
          cardList = ''
        }
    },
    createCard: function() {
      dataHandler.createNewCard(title, 4,  function(response) {
        let board_id = ev.currentTarget.getAttribute('id').replace('addCard', '') 
        let title = document.getElementById(`cardName${board_id}`).value;
        dataHandler.createNewCard(board_id,title, function(response) {
          let cardsContainer = document.querySelector(`#newCards${board_id}`);
          let card = `
              <p class="draggable" draggable="true"> ${response.title} </p>
            `;
          cardsContainer.insertAdjacentHTML('beforeend',card)
        })
  })
  },

   makeDraggable: function() {
    const draggables = document.querySelectorAll('.draggable')
    const dragContainers = document.querySelectorAll('.drag-container')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging')
        })
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging')
        })
    })

    dragContainers.forEach(container => {
        container.addEventListener('dragover', ev => {
            ev.preventDefault()
            const draggable = document.querySelector('.dragging')
            container.appendChild(draggable)
        })
    })
  },
    
    // here comes more features
};
