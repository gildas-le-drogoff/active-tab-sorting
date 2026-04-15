NAME    := active-tab-sorting
SVG     := circle-sort.svg
SIZES   := 16 32 48 128 256 512
ICONS   := $(addprefix images/icon-,$(addsuffix .png,$(SIZES)))
SOURCES := manifest.json background.js $(ICONS)
STORE   := manifest.json background.js $(ICONS) LICENSE

.PHONY: all icons zip store clean

all: zip

icons: $(ICONS)

images/icon-%.png: $(SVG) | images
	rsvg-convert --dpi-x=300 --dpi-y=300 -w $* -h $* $< -o $@
	optipng -o7 -quiet $@

images:
	mkdir -p images

zip: $(NAME).zip

$(NAME).zip: $(SOURCES)
	rm -f $@
	zip -r $@ $^

store: icons $(NAME)-store.zip

$(NAME)-store.zip: $(STORE)
	rm -f $@
	zip $@ $^

clean:
	rm -rf images $(NAME).zip $(NAME)-store.zip
