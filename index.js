const addCards = (usersUrl) => {
    $.ajax({ url: usersUrl }).done((userList) => {
        $.each(userList, (index, user) => {
            $.ajax({ url: user.url }).done((userInfo) => {
                const cardItem = `<div id="${userInfo.id}" class="card-item">` +
                    `<a href="${user.html_url}" class="avatar"><img src="${user.avatar_url}" alt="user avatar"></a>` +
                    `<p class="username">Username: ${user.login}</p>` +
                    `<p>Public Repositories Count: ${userInfo.public_repos}</p>` +
                    '<div class="close-btn"></div>' +
                    '</div>';

                $('.container').append(cardItem);

                cardHandler();
                scrollHandler(usersUrl);
            });
        });
    });
};

const cardHandler = () => {
    let popUpIndicator = 0;
    $('.card-item').each((index, item) => {
        $(item).on('click', () => {
            const avatar = $(item).find('.avatar');
            const closeBtn = $(item).find('.close-btn');

            if (popUpIndicator === 1) {
                popUpIndicator = 0;

                $(item).removeClass('fullscreen-card-item');
                avatar.removeClass('fullscreen-avatar');
                closeBtn.removeClass('close-btn-active');

                $('body').css('overflow-y', 'scroll'); 
            }
            else {
                popUpIndicator = 1;
                
                closeBtn.addClass('close-btn-active');
                $(item).addClass('fullscreen-card-item');
                avatar.addClass('fullscreen-avatar');

                $('body').css('overflow-y', 'hidden');
            }
        });
    });
};

const scrollHandler = (usersUrl) => {
    let scrollState = 0;
    $(window).off('scroll').on('scroll', () => {
        const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        const windowClientHeight = document.documentElement.clientHeight;
        const lastUserID = $('.card-item:last').attr('id');
        
        if (windowRelativeBottom < windowClientHeight + 500 && scrollState === 0) {
            scrollState = 1;
            const newUrl = `${usersUrl.slice(0 , usersUrl.length - 2)}${lastUserID}`;
            addCards(newUrl);
        } else {
            scrollState = 0;
        }
    });
};

addCards("https://api.github.com/users?since=10");
