(function ($) {
    $.fn.infinityScroll = function (params) {
        let defaultOptions =
        {
            scrollThreshold: 400,
            ajax: {
                type: "POST",
                content: "application/json;",
                dataType: "json",
                async: true,
                error: function (response) {
                    console.error(response);
                }
            },
            jsonProperty: "Data"
        };
        params = $.extend(true, defaultOptions, params);
        if (!params.ajax?.url) {
            throw new Error("Url missing");
        }
        let loadingGif;
        if (typeof params.loadingGif === "string") {
            loadingGif = Object.assign(document.createElement("img"), {
                src: params.loadingGif,
                alt: "Loading gif",
                style: "justify-self:center;margin:auto;",
                id: "loadingGif"
            });
        }
        return this.each(function () {
            const appendTarget = $(params.target) ?? $(this);
            const scrollTarget = $(this);
            appendTarget.page = 0;
            scrollTarget.scroll(function () {
                if (!appendTarget.token) {
                    if (scrollTarget.prop("scrollHeight") - scrollTarget.scrollTop() - window.innerHeight <= params.scrollThreshold) {
                        loadContent(appendTarget);

                        appendTarget.token.complete((response) => {
                            if (params.ajax.dataType === "json" && params.jsonProperty in response.responseJSON) {
                                if (!response.responseJSON[params.jsonProperty].trim()) {
                                    scrollTarget.unbind("scroll");
                                }
                            }
                            else if (params.ajax.dataType === "text") {
                                if (!response.responseText.trim()) {
                                    scrollTarget.unbind("scroll");
                                }
                            }
                        });
                    }
                }
            });
            appendTarget.trigger("scroll");
        });

        function loadContent(target) {
            target.token = $.ajax($.extend(true, {}, params.ajax, {
                data: {
                    ...(typeof (params.ajax.data) === 'function' ? params.ajax.data(target.page) : params.ajax.data)
                },
                beforeSend: function (response) {
                    if (loadingGif) {
                        target.append(loadingGif);
                    }
                    if (params.beforeSend && typeof (params.beforeSend) === "function") {
                        params.beforeSend(response);
                    }
                },
                success: function (response) {
                    if (params.ajax.dataType === "json") {
                        if (params.jsonProperty && params.jsonProperty in response) {
                            target.append(response[params.jsonProperty]);
                        } else {
                            throw new Error("Json property not valid");
                        }
                    } else {
                        target.append(response);
                    }
                    if (params.success && typeof (params.success) === "function") {
                        params.success(response);
                    }
                },
                complete: function (response) {
                    if (loadingGif) {
                        target.find(loadingGif).remove();
                    }
                    if (params.complete && typeof (params.complete) === "function") {
                        params.complete(response);
                    }
                    target.page++;
                    target.token = null;
                }
            }));
        }
    }
}(jQuery));
