// Copyright (c) 2018 GitHub, Inc.
// Use of this source code is governed by the MIT license that can be
// found in the LICENSE file.

#ifndef ATOM_COMMON_TRACE_EVENTS_H_
#define ATOM_COMMON_TRACE_EVENTS_H_

#define TRACE_ELECTRON0(name) TRACE_EVENT0("electron", name)
#define TRACE_ELECTRON1(name, arg1) TRACE_EVENT0("electron", name, arg1)
#define TRACE_ELECTRON2(name, arg1, arg2) \
  TRACE_EVENT0("electron", name, arg1, arg2)

#endif  // ATOM_COMMON_TRACE_EVENTS_H_
