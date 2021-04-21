import blogApi from '@/api/api.blog';
export default async function ({
    isHMR,
    app,
    store,
    route,
    params,
    error,
    redirect,
    req
}) {
    // if (isHMR) return;
    if(!req) return;
    const paramID = route.params.id;
    if (paramID) { // 详情页
        const idArray = paramID.split('-');
        const articleID = idArray.pop();
        if (typeof articleID !== 'string') return;
        let browserLang = req.headers['accept-language'].toLowerCase().substr(0, 2);
        let locale = '';
        const supportedLocale = ['en', 'fr', 'de', 'es', 'ar', 'it', 'pt'];
        for (let i = 0; i < supportedLocale.length; i++) {
            if (supportedLocale[i] === browserLang) {
                locale = supportedLocale[i];
                break;
            } else {
                locale = 'en';
            }
        }

        let apiParams = {
            article_id: articleID,
            client_lan: 'en',
            page_url: paramID,
            accept_lan: locale
        };
        try {
            let res = await app.$axios.$get(
                blogApi.getBlogDetailV2,
                { params: apiParams }
            );

            // if (isDev) console.log('res:', res);
            if (res['status'] === 'ok') {
                // DATA.reqObj = res;
                // app.title = DATA.reqObj['seo_title'];
            } else {
                if (res['redirect_url']) {
                    return redirect(301, res['redirect_url']);
                } else {
                    error({ statusCode: 404 });
                }
            }
        } catch (err) {
            console.log('blog detail error:', err);
            error({ statusCode: 500 });
        }

    }
}
