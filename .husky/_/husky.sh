#!/bin/sh
if [ -z "$husky_skip_init" ]; then
  debug() {
    [ "$HUSKY_DEBUG" = "1" ] && echo "husky (debug) - $*"
  }

  readonly hook_name="$(basename "$0")"
  debug "starting $hook_name..."

  readonly husky_dir="$(dirname "$(dirname "$0")")"
  readonly huskyrc=".huskyrc"
  readonly nvmrc="$husky_dir/.nvmrc"
  readonly nvmrc_prefer_local="$husky_dir/.huskyrc.prefer-nvm"
  readonly cmd="$(cat "$0")"
  if [ -f "$huskyrc" ]; then
    debug "huskyrc found at $huskyrc" >&2
  fi
fi
