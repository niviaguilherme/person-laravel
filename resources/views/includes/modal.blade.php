    <div class="modal fade" id="personModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Adicionar/Editar Pessoa</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <input class="form-control mb-4" type="text" placeholder="Nome" name="name" id="name">
                <input class="form-control" type="number" placeholder="Idade" name="age" id="age">
                <input type="hidden" name="id" id="id">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Sair</button>
                <button type="button" class="btn btn-primary" id="salvar">Salvar</button>
            </div>
            </div>
        </div>
    </div>