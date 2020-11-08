
const addCards = () => {
    $.ajax({ url: "https://api.github.com/users" }).done((userList) => {
        $.each(userList, (index, user) => {
            const container = $('.container');

            $.ajax({ url: user.url }).done((userInfo) => {
                const cardItem = `<div id="${userInfo.id}" class="card-item">` +
                    `<a href="${user.html_url}" class="avatar"><img src="${user.avatar_url}"></a>` +
                    `<p class="username">Username: ${user.login}</p>` +
                    `<p>Public Repositories Count: ${userInfo.public_repos}</p>` +
                    '<div class="close-btn"></div>' +
                    '</div>';
                container.append(cardItem);

                $('.card-item').each((index, item) => {
                    let popUpIndicator = 0;
                    $(item).on('click', () => {
                        if (popUpIndicator === 1) {
                            //$(item).find('.close-btn').on('click', function() {

                            //});
                            popUpIndicator = 0;
                            $(item).removeClass('fullscreen-card-item');
                            $(item).find('.avatar').removeClass('fullscreen-avatar');
                            $(item).find('.close-btn').removeClass('close-btn-active');
                        }
                        else {
                            popUpIndicator = 1;
                            $(item).find('.close-btn').addClass('close-btn-active');
                            $(item).addClass('fullscreen-card-item');
                            $(item).find('.avatar').addClass('fullscreen-avatar');                                      
                        }                        
                    });
                });
                
            });

        });
    });
};


addCards();
