
$.ajax({ url: "https://api.github.com/users" }).done((userList) => {
    $.each(userList, (index, value) => {
        const container = $('<main>');
        container.append('<div>', {
            text: 'hello'
        })
        console.log(container)
    });
});