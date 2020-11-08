
const addCards = () => {
    $.ajax({ url: "https://api.github.com/users" }).done((userList) => {
    $.each(userList, (index, user) => {
        const container = $('.container');     
        
        $.ajax({url: user.url}).done((userInfo) => {
            const cardItem = '<div class="card-item">' +
                          `<a href="${user.html_url}" class="avatar"><img src="${user.avatar_url}"></a>` +
                          `<p class="username">Username: ${user.login}</p>` +
                          `<span>Public Repositories Count: ${userInfo.public_repos}</span>` +
                         '</div>';
            container.append(cardItem);

            $('.card-item').on('click', () => {
                console.log(this)
                $(this).addClass('fullscreen-card-item');
            });
        });
        
    });
});
};

addCards();

$('<body>').on('scroll', () => {
    console.log('cool')
    addCards();
})




console.log()