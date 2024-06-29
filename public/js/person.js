const apiURL = "http://127.0.0.1:8000/api";

const createPersonList = () => {
    axios
        .get(`${apiURL}/person`)
        .then(function (response) {
            const data = response.data;

            data.forEach((item) => {
                item.actions = `
                    <button data-id="${item.id}" class="update-btn btn btn-primary btn-sm mr-3">Atualizar</button>
                    <button data-id="${item.id}" class="delete-btn btn btn-danger btn-sm">Excluir</button>
                `;
            });

            $("#tablePerson").DataTable({
                data: data,
                columns: [
                    { data: "name" },
                    { data: "age" },
                    { data: "actions", orderable: false, searchable: false },
                ],
                paging: true,
                searching: true,
                ordering: true,
                language: {
                    decimal: "",
                    emptyTable: "Nenhum dado disponível na tabela",
                    info: "Mostrando _START_ até _END_ de _TOTAL_ registros",
                    infoEmpty: "Mostrando 0 até 0 de 0 registros",
                    infoFiltered: "(filtrado de _MAX_ registros no total)",
                    infoPostFix: "",
                    thousands: ",",
                    lengthMenu: "Mostrar _MENU_ registros",
                    loadingRecords: "Carregando...",
                    processing: "Processando...",
                    search: "Buscar:",
                    zeroRecords: "Nenhum registro encontrado",
                    paginate: {
                        first: "Primeiro",
                        last: "Último",
                        next: "Próximo",
                        previous: "Anterior",
                    },
                    aria: {
                        sortAscending:
                            ": ativar para ordenar a coluna em ordem crescente",
                        sortDescending:
                            ": ativar para ordenar a coluna em ordem decrescente",
                    },
                },
            });
        })
        .catch(function (error) {
            tata.error("Erro ao buscar os dados da API:" + error, "");
        });
};

$("#tablePerson tbody").on("click", ".delete-btn", function () {
    const id = $(this).data("id");
    bootbox.confirm({
        message:
            "Você está prestes a excluir esse registro. Tem certeza que deseja fazer isso?",
        buttons: {
            confirm: {
                label: "Sim",
                className: "btn-success",
            },
            cancel: {
                label: "Não",
                className: "btn-danger",
            },
        },
        callback: function (result) {
            if (result) {
                axios
                    .delete(`${apiURL}/person/${id}`)
                    .then(function (response) {
                        tata.success(response.data.msg, "");
                        $("#tablePerson").DataTable().clear().destroy();
                        createPersonList();
                    })
                    .catch(function (error) {
                        tata.error("Erro ao remover o item", "");
                    });
            }
        },
    });
});

$("#tablePerson tbody").on("click", ".update-btn", function () {
    const id = $(this).data("id");
    axios
        .get(`${apiURL}/person/${id}`)
        .then(function (response) {
            $("#personModal #name").val(response.data.name);
            $("#personModal #age").val(response.data.age);
            $("#personModal #id").val(response.data.id);
            $("#personModal").modal("show");
        })
        .catch(function (error) {
            tata.error("Erro ao buscar o item", "");
        });
});

$(".btn-add").on("click", function () {
    $("#personModal #name").val("");
    $("#personModal #age").val("");
    $("#personModal #id").val("");
    $("#personModal").modal("show");
});

$("#salvar").on("click", function () {
    const name = $("#personModal #name").val();
    const age = $("#personModal #age").val();
    const id = $("#personModal #id").val();

    if (name == "") {
        tata.error("Nome em branco", "");
        return;
    }

    if (age == "") {
        tata.error("Idade em branco", "");
        return;
    }

    if (age < 0) {
        tata.error("A idade não pode ser negativa", "");
        return;
    }

    const data = {
        name: name,
        age: age,
    };

    if (id == "") {
        axios
            .post(`${apiURL}/person`, data)
            .then(function (response) {
                tata.success(response.data.msg, "");
                $("#personModal #name").val("");
                $("#personModal #age").val("");
                $("#personModal #id").val("");
                $("#tablePerson").DataTable().clear().destroy();
                createPersonList();
                $("#personModal").modal("toggle");
            })
            .catch(function (error) {
                tata.error("Erro ao cadastrar o item", "");
            });
    } else {
        axios
            .put(`${apiURL}/person/${id}`, data)
            .then(function (response) {
                tata.success(response.data.msg, "");
                $("#personModal #name").val("");
                $("#personModal #age").val("");
                $("#personModal #id").val("");
                $("#tablePerson").DataTable().clear().destroy();
                createPersonList();
                $("#personModal").modal("toggle");
            })
            .catch(function (error) {
                tata.error("Erro ao atualizar o item", "");
            });
    }
});
