
const addCards = (usersUrl) => {
    $.ajax({ url: usersUrl }).done((userList) => {
        $.each(userList, (index, user) => {
            $.ajax({ url: user.url }).done((userInfo) => {
                const cardItem = `<div id="${userInfo.id}" class="card-item">` +
                    `<a href="${user.html_url}" class="avatar"><img src="${user.avatar_url}"></a>` +
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
    $('.card-item').each((index, item) => {
        let popUpIndicator = 0;
        $(item).on('click', () => {
            if (popUpIndicator === 1) {
                popUpIndicator = 0;
                $(item).removeClass('fullscreen-card-item');
                $(item).find('.avatar').removeClass('fullscreen-avatar');
                $(item).find('.close-btn').removeClass('close-btn-active');
                $('body').css('overflow-y', 'scroll'); 
            }
            else {
                popUpIndicator = 1;
                $(item).find('.close-btn').addClass('close-btn-active');
                $(item).addClass('fullscreen-card-item');
                $(item).find('.avatar').addClass('fullscreen-avatar');
                
                $('body').css('overflow-y', 'hidden');
            }
        });       
    });
};
let scrollState = 0;
const scrollHandler = (usersUrl) => {
    $(window).off('scroll').on('scroll', function() {
        const windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        const windowClientHeight = document.documentElement.clientHeight;
        const lastUserID = $('.card-item:last').attr('id');
        console.log(windowRelativeBottom)
        
        if (windowRelativeBottom > windowClientHeight + 500 && scrollState === 1) {
            scrollState = 0;
        } if (windowRelativeBottom < windowClientHeight + 500 && scrollState === 0) {
            scrollState = 1;            
            const newUrl = `${usersUrl.slice(0 , usersUrl.length - 2)}${lastUserID}`;
            addCards(newUrl);
        }        
    });
};

addCards("https://api.github.com/users?since=10");
