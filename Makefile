CDN_JS = https://cdnjs.cloudflare.com/ajax/libs/
TWBS_CDN = https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/
TWBS_VERSION = 3.3.6
JQ_VERSION = 1.12.1
MZR_VERSION = 2.8.3
RESPOND_VERSION = 1.4.2
FONT_FILE = glyphicons-halflings-regular

install:
	mkdir js/vendor
	@echo Downloading js libs
	@echo  bootstrap
	@(cd js/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/js/bootstrap.js)
	@(cd js/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/js/bootstrap.min.js)
	@echo  jquery
	@(cd js/vendor && curl -# -O $(CDN_JS)jquery/$(JQ_VERSION)/jquery.min.js)
	@echo  modernizr
	@(cd js/vendor && curl -# -O $(CDN_JS)modernizr/$(MZR_VERSION)/modernizr.min.js)
	@echo  respond
	@(cd js/vendor && curl -# -O $(CDN_JS)respond.js/$(RESPOND_VERSION)/respond.min.js)
	@echo  npm.js
	@(cd js/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/js/npm.js)
	mkdir css/vendor
	@echo Downloading bootstrap css
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap.css)
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap.css.map)
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap.min.css)
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap-theme.css)
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap-theme.css.map)
	@(cd css/vendor && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/css/bootstrap-theme.min.css)
	@echo Downloading font $(FONT_FILE) variants
	@for fileext in eot svg ttf woof woof2 ; do \
		(cd fonts && curl -# -O $(TWBS_CDN)$(TWBS_VERSION)/fonts/$(FONT_FILE).$$fileext) ; \
	done

clean:
	@rm -rf css/vendor js/vendor fonts/$(FONT_FILE).*
