/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "94d4d420eb170d524f43";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./src/lib/Ads/PageManager/Test/PageManager.js")(__webpack_require__.s = "./src/lib/Ads/PageManager/Test/PageManager.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/Ads/Ad/Base/Ad.js":
/*!***********************************!*\
  !*** ./src/lib/Ads/Ad/Base/Ad.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ad; });
/* harmony import */ var _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Arch/Promised */ "./src/lib/Arch/Promised.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Common */ "./src/lib/Common.js");
/* harmony import */ var _Browser_UUID__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Browser/UUID */ "./src/lib/Browser/UUID.js");




class Ad extends _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    static get EVENT_AD_AVAILABLE(){return 1;}
    static get EVENT_AD_EMPTY()    { return 2;}
    static get EVENT_VISIBILITY_CHANGE() {return 3;}
    static get EVENT_SLOT_VISIBLE() {return  4;}
    static get EVENT_AD_ERROR() {return 5;}

    constructor(serviceContainer,slotId,slotConfig,config)
    {
        super();
        this.id=Object(_Browser_UUID__WEBPACK_IMPORTED_MODULE_2__["default"])();
        this.slotId=slotId;
        this.logger=serviceContainer.get("Log");
        this.logger.debug("Creando anuncio");
        this.config=config;
        this.adConfig=slotConfig.ad;
        this.container=null;
        this.adService=serviceContainer.get(this.getServiceName());
        this.behaviours={};
        this.serviceContainer=serviceContainer;
        this.request=null;
        this.empty=null;
        this.errored=false;
    }

    initialize()
    {
        this.prependPromises({
            "configured":"Requesting",
            "attached":this.isPrefetching()?"Displaying":"Requesting",
            "loaded":"Loaded",
            "destroyed":"Destroyed",
            "displayed":"Displayed",
            "impression":"Impression",
            "ready":"Ready"}
        );
        this.before("Created").wait(this.adService.isInState("Configured"));
        if(this.adConfig.behaviours!=undefined)
        {
            for(let k in this.adConfig.behaviours)
            {
                let i=this.adConfig.behaviours[k];
                let newI=new i.type(this.serviceContainer,this,i.config);
                newI.initialize();
                this.behaviours[k]=newI;
            }
        }
        this.run(["Created","Ready","Configuring","Requesting","Loaded","Displayed","Impression","Idle","Destroyed"]);
    }

    // Created se dispara cuando hay un ad potencialmente disparable.Aun no se sabe si esta enabled o no.
    onCreated(){
        if(this.config["slots"][this.slotId].enabled) {

            this.resolve("ready");
        }
    }

    attach(container)
    {
        this.container=container;
        this.resolve("attached");
        this.debug("AD_ATTACHED");
    }

    // Ready se dispara cuando se ha comprobado que este ad slot esta activo.
    onReady(){
        this.debug("AD_READY");
    }
    // Configuring se dispara cuando el ad esta configurado a nivel de tamanios, targeting,etc
    onConfiguring(){
        this.debug("AD_Configuring");
        this.adService.configureAd(this);
        this.resolve("configured");
    }
    // Requested se dispara cuando se realiza la peticion de anuncio al backend
    onRequesting()
    {
        this.debug("AD_REQUESTING");
        this.request=this.adService.requestAd(this);

        this.addListener("EVENT_AD_EMPTY",null,()=>{
            this.gotoState("Idle");
            }
        );
        this.request.id=this.id;
    }
    setLoaded()
    {
        this.resolve("loaded");
    }
    onLoaded()
    {
        this.debug("AD_LOADED");
    }

    setDisplayed()
    {
        this.resolve("displayed");
    }
    // Displayed se dispara cuando el anuncio ha terminado de mostrarse
    onDisplayed(){
        this.debug("AD_DISPLAYED");
    }
    gotImpression()
    {
        this.resolve("impression");
    }
    // Impression se dispara cuando el anuncio ha dado impresion
    onImpression(){
        this.debug("AD_IMPRESSION");
    }
    // Destroyed es disparado cuando el anuncio es destruido desde fuera
    onIdle(){
        this.debug("AD_IDLE");
    }
    destroy()
    {
        this.resolve("destroyed");
    }
    onDestroyed()
    {
        this.debug("AD_DESTROYED");
    }

    /**
     *     UTILITY METHODS
     */

    isPrefetching()
    {
        return this.adConfig.prefetch || false;
    }
    getServiceName()
    {
        return this.adConfig.adProvider;
    }
    getServiceParam(service,param)
    {
        if(this.adConfig[service]===undefined)
            return null;
        if(param===undefined)
            return this.adConfig[service];

        return (this.adConfig[service][param]!==undefined)?this.adConfig[service][param]:null;
    }
    getTargeting()
    {
        return {
            "adId":this.id
        }
    }
    getSizes()
    {
        return this.adConfig.sizes===undefined?[]:this.adConfig.sizes;
    }
    getContainer()
    {
        return this.container;
    }
    getBehaviour(beh)
    {
        if(this.adConfig.behaviours===undefined)
            return null;
        if(this.adConfig.behaviours[beh]===undefined)
            return null;
        return this.adConfig.behaviours[beh].config;
    }
    getCurrentRequest()
    {
        return this.currentRequest;
    }
    isEmpty()
    {
        return this.empty;
    }
    setErrored(code)
    {
        this.errored=true;
        this.fireEvent(Ad.EVENT_AD_ERROR,{ad:this,code:code});
    }
    debug(str)
    {
        console.log("[AD "+this.id+"]:"+str);
    }

}

/***/ }),

/***/ "./src/lib/Ads/Ad/Base/AdBehaviour.js":
/*!********************************************!*\
  !*** ./src/lib/Ads/Ad/Base/AdBehaviour.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdBehaviour; });
class AdBehaviour
{
    constructor(serviceContainer,ad,config)
    {
        this.ad=ad;
        this.config=config;
        this.serviceContainer=serviceContainer;
    }
}

/***/ }),

/***/ "./src/lib/Ads/Ad/Base/AdService.js":
/*!******************************************!*\
  !*** ./src/lib/Ads/Ad/Base/AdService.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdService; });
/* harmony import */ var _Service_Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Service/Service */ "./src/lib/Service/Service.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Common */ "./src/lib/Common.js");


class AdService extends _Service_Service__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    static get EVENT_SERVICE_LOADED(){ return "EVENT_SERVICE_LOADED";}
    static get EVENT_SERVICE_ERROR() { return "EVENT_SERVICE_ERROR";}
    static get ADSERVICE_DISPLAY()   { return "Display";}
    static get ADSERVICE_VIDEO()     { return "Video";}


    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);
        this.registeredAds=[];
    }
    initialize()
    {
        this.prependPromises({"ready":"Ready"});
        this.run(["Initialized","Configured","Ready"]);
    }
    createRequest(ad)
    {

    }
    getSlotConfiguration(id)
    {
        let results=[this.config.slots.default || {}];
        if(this.config.slots[id]==="undefined")
            throw "Unknown slot:"+id;
        let byIdConfig=this.config.slots[id].ad;
        results.push(byIdConfig);
        if(byIdConfig.tags)
        {
            for(var k in byIdConfig.tags)
            {
                // Crear un objeto, para permitir tests para incluir o no la
                // template (ej, a/b testing, condiciones sobre viewability,etc.
                // Permitir templates dentro de templates.
                // Las templates tambien deben permitir establecer targetings.
                if(this.config.tags[k]!==undefined)
                    results.push(this.config.tags[k]);
            }
        }
        return _Common__WEBPACK_IMPORTED_MODULE_1__["deepmerge"].all.apply(null,results);
    }
    registerAd(ad)
    {
        this.registeredAds.push(ad);
    }
    configureAd(ad)
    {
    }
    getTagName()
    {
        return "generic";
    }
    getAdServiceType()
    {
        return AdService.ADSERVICE_DISPLAY;
    }
}

/***/ }),

/***/ "./src/lib/Ads/Ad/Display/AdDisplayRequest.js":
/*!****************************************************!*\
  !*** ./src/lib/Ads/Ad/Display/AdDisplayRequest.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdDisplayRequest; });
/* harmony import */ var _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Arch/Promised */ "./src/lib/Arch/Promised.js");
/* harmony import */ var _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Browser/Timing */ "./src/lib/Browser/Timing.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../Common */ "./src/lib/Common.js");
/* harmony import */ var _Base_Ad__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Base/Ad */ "./src/lib/Ads/Ad/Base/Ad.js");





class AdDisplayRequest extends _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(serviceContainer, ad) {
        super();
        this.ad = ad;
        this.id = ad.id;
        this.data = {
            id: null,
            requestTimestamp: _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].timestamp(), //
            requestTime: _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative(),
            requestSentTime: null,
            requestSentLocalTime:null,
            loadTime: null,
            loadLocalTime: null,
            displayStartTime:null,
            displayStartLocalTime:null,
            displayTime: null,
            displayLocalTime: null,
            requestToDisplayTime:null,

            impression:false,
            impressionTime:null,
            impressionLocalTime:null,

            requestedSizes: null,

            viewable: false,
            viewableTime: null,
            viewableLocalTime: null,

            maxViewability: 0,
            errorCount:0,
            lastErrorCode:0,
            lastErrorMessage:0,

            lineItemId: null,
            advertiserId: null,
            isEmpty: true,
            campaignId: null,
            creativeId: null,
            receivedSize: null,

            innerAdUnit: typeof window._SMCMacroSite === "undefined" ? "Unknown" : window._SMCMacroSite,
            finished: null
        };
        var sizes = this.ad.getSizes();
        if(typeof sizes[0]==="number")
            sizes=[sizes];

        this.data.requestedSizes = sizes.map(function (i) {
            if (_Common__WEBPACK_IMPORTED_MODULE_2__["isArray"](i))
                return i[0] + 'x' + i[1];
            if (_Common__WEBPACK_IMPORTED_MODULE_2__["isString"](i))
                return i;
            return ""
        }).sort().join(",");

    }

    toRelative() {
        return _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative() - this.data.requestTime;
    }

    onRequested(event) {
        this.data.requestSentTime = _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative();
        this.data.requestSentLocalTime = this.toRelative();
    }
    onLoaded(event)
    {
        this.data.loadTime= _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative();
        this.data.loadLocalTime = this.toRelative();
        this.ad.onLoaded();
    }

    onViewable(event) {
        this.data.viewable = true;
        this.data.viewableTime = _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative();
        this.data.viewableLocalTime = this.toRelative();
        this.ad.fireEvent(_Base_Ad__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_SLOT_VISIBLE, {ad: this.ad});
    }

    onDisplayStart(event) {
        this.data.displayStartTime=Timimng.relative();
        this.data.displayStartLocalTime=this.toRelative();
    }

    onDisplayEnded(event) {
        this.ad.setDisplayed();
        this.data.displayTime = _Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative();
        this.data.displayLocalTime = this.toRelative();
        this.data.requestToDisplayTime=this.data.displayLocalTime - this.data.requestSentLocalTime;

    }

    onEmpty() {
        this.data.isEmpty = true;
        this.ad.log("EMPTY");
        this.ad.fireEvent(_Base_Ad__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_AD_EMPTY, {ad: this.ad});
    }

    onAdReceived(advertiser, campaign, creative, lineItem) {
        this.data["advertiserId"] = advertiser;
        this.data["campaignId"] = campaign;
        this.data["creativeId"] = creative;
        this.data["lineItemId"] = lineItem;
        this.ad.fireEvent(_Base_Ad__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_AD_AVAILABLE, {slot: this.ad});
    }
    onSlotVisibilityChange(percent)
    {
        this.ad.fireEvent(_Base_Ad__WEBPACK_IMPORTED_MODULE_3__["default"].EVENT_VISIBILITY_CHANGE,{ad:this.ad,visibility:percent});
    }
    onImpression()
    {
        this.data.impression=true;
        this.data.impressionTime=_Browser_Timing__WEBPACK_IMPORTED_MODULE_1__["default"].relative();
        this.data.impressionLocalTime=this.toRelative();
    }
    addProperty(key, value) {
        this.data[key] = value;
    }
    onError()
    {

    }
    finish() {
    }
}

/***/ }),

/***/ "./src/lib/Ads/Ad/Display/AppNexus/AppNexusService.js":
/*!************************************************************!*\
  !*** ./src/lib/Ads/Ad/Display/AppNexus/AppNexusService.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppNexusService; });
/* harmony import */ var _Base_AdService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Base/AdService */ "./src/lib/Ads/Ad/Base/AdService.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Common */ "./src/lib/Common.js");
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Network */ "./src/lib/Network.js");
/* harmony import */ var _Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Arch/SMCPromise */ "./src/lib/Arch/SMCPromise.js");




class AppNexusService extends _Base_AdService__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    onInitialized(){
        /* Se carga la libreria js de google */
        if(window.apntag===undefined)
        {
            window.apntag={anq:[]};
        }
        this.loadPromise=Object(_Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this.loaded=false;
        this.apn=window.apntag;
        this.slotFromAd={};
        if(this.config.autoload)
            this.load();
    }
    onConfigured(){
        this.apn.anq.push(
          ()=>
          {
              this.apn.setPageOpts({
                  member:this.config.member
              });
          }
        );
    }
    onReady(){}

    onEvent(id,slot,message) {

        if(this.eventsById[id]===undefined) {
            cosole.log("EVENTO DESCONOCIDO:"+id);
            return;
        }
        // Lanzar eventos para plugins.
        console.log(id+":"+this.eventsById[id]+":"+message);
    }

    requestAd(ad)
    {

    }
    displayAd(ad)
    {
        this.apn.anq.push(()=>{
            //this.apn.refresh([ad.getContainer().getId()]);
            this.apn.showTag([ad.getContainer().getId()]);
            this.apn.loadTags();
        });
    }
    configureAd(ad)
    {
        this.load();
        ad.before("Requesting").wait(this.loadPromise);
        this.apn.anq.push(()=>{
            let contId=ad.getContainer().getId();
            this.apn.defineTag({
                tagId: ad.getServiceParam("AppNexus","adunit"),
                sizes: ad.getSizes(),
                targetId: contId
            });
            let targeting=ad.getTargeting();
            this.apn.setKeywords(contId,targeting);
            this.slotFromAd[contId]=ad;
            }
        );
    }
    load()
    {
        if(this.loaded)
            return;
        this.apn.anq.push(()=> this.resolve("gptPromise"));
        _Network__WEBPACK_IMPORTED_MODULE_2__["asyncLoad"]("//acdn.adnxs.com/ast/ast.js")
            .then(()=>{
                this.loaded=true;
                this.loadPromise.resolve();
            });
    }

}

/***/ }),

/***/ "./src/lib/Ads/Ad/Display/GPT/GPTRequest.js":
/*!**************************************************!*\
  !*** ./src/lib/Ads/Ad/Display/GPT/GPTRequest.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GPTRequest; });
/* harmony import */ var _AdDisplayRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AdDisplayRequest */ "./src/lib/Ads/Ad/Display/AdDisplayRequest.js");

class GPTRequest extends _AdDisplayRequest__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    onError()
    {
        console.log("Error  ed 2");
    }
}

/***/ }),

/***/ "./src/lib/Ads/Ad/Display/GPT/GPTService.js":
/*!**************************************************!*\
  !*** ./src/lib/Ads/Ad/Display/GPT/GPTService.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GPTService; });
/* harmony import */ var _Base_AdService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Base/AdService */ "./src/lib/Ads/Ad/Base/AdService.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Common */ "./src/lib/Common.js");
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Network */ "./src/lib/Network.js");
/* harmony import */ var _Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Arch/SMCPromise */ "./src/lib/Arch/SMCPromise.js");
/* harmony import */ var _GPTRequest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./GPTRequest */ "./src/lib/Ads/Ad/Display/GPT/GPTRequest.js");









class GPTService extends _Base_AdService__WEBPACK_IMPORTED_MODULE_0__["default"] {
    onInitialized() {
        /* Se carga la libreria js de google */
        if (window.googletag === undefined)
            window.googletag = {
                cmd: []
            };
        this.loadPromise = Object(_Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_3__["default"])();
        this.loaded = false;
        this.gt = googletag;
        this.slotFromAd = {};
        this.definedSlots = {};
        this.adFromSlot = {};
        if (this.config.autoload)
            this.load();

        this.events =
            {
                PAGE_LOAD_COMPLETE: 1,
                SLOT_CREATE: 2,
                SLOT_FETCH: 3,
                SLOT_RECEIVING: 4,
                SLOT_RENDERING: 5,
                SLOT_RENDERED: 6,
                GOOGLE_JS_LOADED: 8,
                DEFINE_ATTRIBUTE: 9,
                DEFINE_POSTATTRIBUTE: 10,
                WARN_SLOT_ALREADY_ASSOCIATED: 12,
                ERR_SIZE_ASSIGN: 13,
                DEFINE_CATEGORY_EXCLUSION: 14,
                REMOVE_CATEGORY_EXCLUSION: 16,
                DEFINE_SEGMENT_ATTRIBUTE: 17,
                REMOVE_SEGMENT_ATTRIBUTE: 19,
                WARN_IGNORE_COLLAPSE: 20,
                ERR_CANT_WRITE_SLOT: 21,
                ERR_CANT_FIND_DIV: 22,
                ERR_CANT_FIND_DIV_SLOT: 23,
                ERR_UNKNOWN_DISPLAY_DIV: 26,
                ERR_UNASSIGNED_DIV_DISPLAY: 27,
                ERR_ALREADY_ASSIGNED_DIV: 28,
                ERR_FUNCTION_EXCEPTION: 30,
                QUEUE_FUNC_INVOKED: 31,
                ERR_INVALID_SIZE_ASSIGMENT: 34,
                SERVICE_CREATED: 35,
                DEFINE_SERVICE_ATTRIBUTE: 36,
                ERR_DEFINE_SERVICE_ATTRIBUTE: 37,
                SERVICE_ALREADY_ENABLED: 38,
                ERR_CANT_ENABLE_SERVICE: 39,
                SERVICE_ADD_SLOT: 40,
                ERR_INVALID_AD_SIZE: 41,
                ERR_ROADBLOCK: 42,
                ERR_SERVICE_NOT_ENABLED: 43,
                ERR_CANT_CHECK_ROADBLOCK: 44,
                ERR_CANT_FIND_SLOT: 45,
                GPT_FETCH: 46,
                ERR_GPT_FETCH: 47,
                GPT_FETCHED: 48,
                ERR_CANT_UPDATE: 49,
                FILL_SLOT: 50,
                ERR_SYNC_CALL_AFTER_LOAD: 52,
                AD_RENDER_DELAYED: 53,
                PASSBACK_DELAYED: 54,
                AD_RENDER_AVOIDED: 55,
                ERR_SLOT_NAME: 56,
                WARN_UNKNOWN_PUBADS_ATTRIBUTE: 57,
                WARN_UNKNOWN_SLOT_ATTRIBUTE: 58,
                ERR_COOKIE_OPTIONS: 59,
                WARN_SERVICE_ENABLED_1: 60,
                WARN_SERVICE_ENABLED_2: 61,
                WARN_SERVICE_ENABLED_3: 62,
                SET_RENDER_MODE: 63,
                DEFINE: 64,
                ERR_NO_VALID_SLOT_FOUND: 65,
                WARN_REFRESH_GPT_NOT_LOADED: 66,
                WARN_NO_REFRESH_GPT_NOT_LOADED: 67,
                WARN_SLOT_CLEAR_GPT_NOT_LOADED: 68,
                UPDATE_QUEUED: 69,
                UPDATING_ADS: 70,
                CLEARING_ADS: 71,
                REMOVING_NO_REFRESH: 72,
                ERR_MUST_BE_MATRIX: 73,
                ERR_MUST_BE_BOOLEAN: 74,
                ERR_MUST_BE_NUMBER: 75,
                ERR_MUST_BE_STRING: 76,
                WARN_LOCATION_TRUNCATED: 77,
                COLLAPSE_DIVS_ENABLED: 78,
                WARN_COLLAPSE_DIVS_CONFIGURED: 79,
                ERR_INVALID_SLOT_IN_POSITION: 80,
                REMOVE_SEGMENT_ATTRIBUTE_2: 82,
                WARN_CANT_FIND_SEGMENT_ATTRIBUTE: 84,
                CATEGORY_EXCLUSION_DEFINED: 85,
                CATEGORY_EXCLUSIONS_REMOVED: 87,
                SERVICE_ATTRIBUTE_DEFINED: 88,
                ERR_INVALID_TAG_TYPE: 90,
                ERR_EXCEPTION_IN_EVENT_HANDLER: 92,
                ERR_UNKNOWN_EVENT: 93,
                ERR_UNKNOWN_SERVICE_FOR_SLOT: 94,
                ERR_CORRELATOR: 95,
                ERR_INVALID_ARGUMENTS: 96,
                ERR_INVALID_CHILDSAFE_TYPE: 97,
                ERR_OAS: 98,
                SLOT_DESTROYED: 99,
                ERR_INVALID_SAFEFRAME_ATTR: 100,
                ERR_INVALID_SAFEFRAME_VALUE: 101,
                WARN_CANT_FIND_SLOT_SEGMENT_ATTRIBUTE: 102,
                SEGMENT_ATTRIBUTE_REMOVED: 103,
                SEGMENT_ATTRIBUTES_CLEARED: 104,
                SLOT_REFRESH_REQUESTED: 1000,
                EVENT_SLOT_VIEWABLE: 1001,
                EVENT_SLOT_VIEWABILITY_CHANGED: 1002,
                EVENT_SLOT_RENDERED: 1003
            };
        this.eventsById = {};
        for (var k in this.events)
            this.eventsById[this.events[k]] = k;

    }

    onConfigured() {
        this.gt.cmd.push(() => {
            this.__log = googletag.debug_log.log;
            let m = this;
            googletag.debug_log.log = function (level, message, service, slot, reference) {
                if (message && message.getMessageId && typeof (message.getMessageId()) === 'number') {
                    m.onEvent(message.getMessageId(), slot, message);
                }
                return m.__log.apply(m.gt.debug_log, arguments);
            };
            let pads = this.gt.pubads();

            pads.addEventListener('impressionViewable', function (event) {
                m.onSlotViewable(event)
            });
            pads.addEventListener('slotRenderEnded', function (event) {
                m.onSlotRenderEnded(event)
            });
            pads.addEventListener('slotVisibilityChanged', function (event) {
                m.onSlotVisibilityChanged(event);
            });
            pads.addEventListener('slotOnload', function (event) {
                m.onSlotOnload(event);
            });

            pads.collapseEmptyDivs();
            this.gt.enableServices();
        });

    }

    onReady() {
    }

    requestAd(ad) {
        let r = this.createRequest(ad);
        this.displayAd(ad);
        return r;
    }

    displayAd(ad) {
        this.gt.cmd.push(() => {
            this.gt.display(ad.getContainer().getId());
        });
    }

    configureAd(ad) {
        this.load();
        ad.before("Requesting").wait(this.loadPromise);
        this.gt.cmd.push(() => {
            let adslot = ad.getServiceParam("GPT", "adunit");
            let sizes = ad.getSizes();
            let gptSizes = ad.getServiceParam("GPT", "sizes");
            let targeting = ad.getTargeting();
            sizes = sizes.concat(gptSizes || []);
            let contId = ad.getContainer().getId();
            let slot = null;
            if (this.definedSlots[contId] === undefined) {
                slot = this.gt.defineSlot(adslot, sizes, contId);
                this.definedSlots[contId] = slot;
            }
            else {
                this.definedSlots[contId] = slot;
                slot.clearTargeting();
            }

            for (let k in targeting)
                slot.setTargeting(k, targeting[k]);
            slot.addService(this.gt.pubads());
            this.slotFromAd[contId] = slot;
            this.adFromSlot[contId] = ad;
        });
    }

    load() {
        if (this.loaded)
            return;
        var useSSL = 'https:' === document.location.protocol;
        this.gt.cmd.push(() => this.resolve("gptPromise"));
        _Network__WEBPACK_IMPORTED_MODULE_2__["asyncLoad"]((useSSL ? 'https:' : 'http:') + '//www.googletagservices.com/tag/js/gpt.js')
            .then(() => {
                this.loaded = true;
                this.loadPromise.resolve();
            });
    }


    createRequest(ad) {
        return new _GPTRequest__WEBPACK_IMPORTED_MODULE_4__["default"](this.serviceContainer,ad);
    }

    onSlotViewable(event) {
        let ad = this.adFromSlot[event.slot.getElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getElementId());
        if (ad.request != null)
            ad.request.onViewable();
    }

    onSlotRenderEnded(event) {

        let slot = event.slot;
        let ad = this.adFromSlot[slot.getElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getElementId());
        if (ad.request == null)
            return;
        let req = ad.request;
        var m1 = event.slot.getResponseInformation();
        if (!m1)
            req.onEmpty();
        else {
            if (!m1.advertiserId || !m1.creativeId) {
                req.onEmpty();
            }
            else {
                let szc = event.size.constructor.toString();
                let receivedSize = null;
                let isOutOfPage = slot.getOutOfPage();
                if (!isOutOfPage) {
                    if (szc.indexOf("tring") > 0)
                        receivedSize = message.size;
                    else {
                        if (szc.indexOf("rray"))
                            receivedSize = message.size[0] + "x" + message.size[1];
                    }
                }
                else
                    receivedSize = "0x0";

                req.addProperty("isBackfill", m1.isBackfill);
                req.addProperty("serviceName", m1.serviceName);
                req.addProperty("isOutOfPage", slot.getOutOfPage());
                req.addProperty("isFirstLook", slot.getFirstLook() == 0 ? false : true);

                req.onAdReceived(
                    m1.advertiserId,
                    m1.campaignId,
                    m1.creativeId,
                    m1.lineItemId,
                    receivedSize);
            }
        }
        req.onDisplayEnded();
    }

    onSlotVisibilityChanged(event) {
        let slot = event.slot;
        let ad = this.adFromSlot[slot.getElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getElementId());
        if (ad.request == null)
            return;
        ad.request.onSlotVisibilityChange(event.inViewPercentage);
    }

    onSlotOnload(event) {
        let slot = event.slot;
        let ad = this.adFromSlot[slot.getElementId()];
        if (ad === undefined)
            return console.error("Unknown ad from slot " + event.slot.getElementId());
        if (ad.request == null)
            return;
        req.onImpression();

    }

    onEvent(id, slot, message) {
        if (this.eventsById[id] === undefined) {
            console.log("EVENTO DESCONOCIDO:" + id);
            return;
        }
        console.log("--->EVENT:"+this.eventsById[id]);
        let adId = slot ? slot.getSlotElementId() : null;
        let ad=null;
        if(adId)
            ad=this.adFromSlot[adId];
        let req = ad ? ad.request : null;
        switch (this.eventsById[id]) {
            case "SLOT_CREATE": {
            }
                break;
            case "SLOT_FETCH": {
                req.onRequested();
            }
                break;
            case "SLOT_RECEIVING": {
                req.onLoaded();

            }
                break;
            case "SLOT_RENDERING": {
                req.onDisplayStart();
                //ad.setDisplaying();
            }
                break;
            case "SLOT_RENDERED": {
                // Tratado en onSlotRenderEnded
                //ad.setDisplayed();

            }
                break;
            case "GOOGLE_JS_LOADED": {

            }
                break;
            default: {
                if (this.eventsById[id].substr(0, 4) === "ERR_") {
                    if (slot !== undefined) {
                        req.onError(message);
                    }

                }
            }
        }
    }

    getTagName() {
        return "DFP";
    }
}



/***/ }),

/***/ "./src/lib/Ads/Ad/Video/OutStream/Ava.js":
/*!***********************************************!*\
  !*** ./src/lib/Ads/Ad/Video/OutStream/Ava.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ava; });
/* harmony import */ var _Base_AdService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Base/AdService */ "./src/lib/Ads/Ad/Base/AdService.js");
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Network */ "./src/lib/Network.js");



class Ava extends _Base_AdService__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    onInitialized(){

    }
    onConfigured(){
    }
    onReady(){}

    onEvent(id,slot,message) {
    }
    requestAd(ad)
    {

    }
    configureAd(ad)
    {
        top.Site_conf=ad.getServiceParam("Ava");
        ad.before("Requesting").wait(
            _Network__WEBPACK_IMPORTED_MODULE_1__["asyncLoad"]("https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/ava/ava.js")
        );
    }

}
/*
SmartAva = {
    config: {
        siteConfPath: "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/ava/config/",
        smartclipConfig: "https://cdn.smartclip-services.com/v1/Storage-a482323/smartclip-services/HeaderBidding/js/SmartclipConfig.js",
        js_dependencies: ["https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"],
        pixels: [
            {
                "name": "generic1",
                "url": "//smx-stats.smartclipconfig.com/Transparent1.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic2",
                "url": "//smx-stats.smartclipconfig.com/Transparent2.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic3",
                "url": "//smx-stats.smartclipconfig.com/Transparent3.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic4",
                "url": "//smx-stats.smartclipconfig.com/Transparent4.gif?player_id=",
                "needPlayerId": true
            },
            {
                "name": "generic5",
                "url": "//smx-stats.smartclipconfig.com/Transparent5.gif?player_id=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "generic6",
                "url": "//smx-stats.smartclipconfig.com/Transparent6.gif?player_id=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "generic7",
                "url": "//smx-stats.smartclipconfig.com/Transparent7.gif?player_id=",
                "event": ["complete"],
                "needPlayerId": true
            },
            {
                "name": "generic8",
                "url": "//smx-stats.smartclipconfig.com/Transparent8.gif?player_id=",
                "event": ["complete"],
                "needPlayerId": true
            },
            {
                "name": "genericBR1",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR1.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericBR2",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR2.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericBR3",
                "url": "//smx-stats.smartclipconfig.com/TransparentBR3.gif?player_id=",
                "event": ["noAd"],
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM1",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX1.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM2",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX2.gif?player_id=",
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "genericLATAM3",
                "url": "//smx-stats.smartclipconfig.com/TransparentMX3.gif?player_id=",
                "event": ["noAd"],
                "country": ["br"],
                "needPlayerId": true
            },
            {
                "name": "bluekai",
                "url": "//tags.bluekai.com/site/47890?ret=js&limit=1&phint=sc_videosite%3D",
                "needPlayerId": true
            },
            {
                "name": "comscoreImpression",
                "url": "//smx-stats.smartclipconfig.com/Csi.gif?guid="+ getGuid()+ "&playerId=",
                "event": ["noAd"],
                "needPlayerId": true
            },
            {
                "name": "sc_DV360",
                "url": "//ad.sxp.smartclip.net/sync?type=red&dsp=10",
                "event": ["noAd"],
                "country": ["ar", "br", "co", "ec", "mx", "pe", "us"],
                "frequency": [1, 720]
            },
            {
                "name": "sc_MediaMath",
                "url": "//ad.sxp.smartclip.net/sync?type=red&dsp=40",
                "event": ["noAd"],
                "country": ["ar", "br", "co", "ec", "mx", "pe", "us"],
                "frequency": [1, 720]
            },
            {
                "name": "uniqueUserApnx",
                "url": "https://secure.adnxs.com/seg?add=14832416&t=2",
                "country" : ["es"]
            }
        ]
    },
    utils: {
        ava_sc_smartIntxtStart: function(container) {

            SmartAva.utils.showElement(container);
            if (Ava_conf.hardSkip && Ava_conf.hardSkip != 0) {
                SmartAva.utils.addSkipButton(Ava_conf.hardSkip, container,SmartAva.utils.ava_sc_smartIntxtEnd)
            }
        },

        ava_sc_smartIntxtEnd: function() {

            if (Ava_conf.nonstop) {
                if (typeof top.sc_intext_cont == "undefined") {
                    top.sc_intext_cont = 0;
                }
                var reference = "smartIntxt" + top.sc_intext_cont;
                SmartAva.utils.removeFixedClasses(Ava_conf.fixedClass);
                top.sc_intext_cont++;
                var ref_element = '<div id="' + reference + '" class = "' + Ava_conf.fixedClass + '" ></div>';
                top.avaContainerElement.insertAdjacentHTML('beforebegin', ref_element);
                SmartAva.init(VideoManager.ava.getElementIdCrossFrames(reference), Ava_conf);
            }else{
                SmartAva.utils.hideElement(SmartIntxt.config.elementContainer);
            }

        },
        intxt_sc_smartIntxtStart : function(container){
            try {
                sc_smartIntxtStart();
            } catch(e) {
                console.log(e);
            }
            if (!container.id) container = VideoManager.ava.getElementIdCrossFrames(container);
            var intxtConf = top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"];
            if (typeof(intxtConf) != "undefined" && intxtConf.hardSkip != 0) {
                SmartAva.utils.addSkipButton(intxtConf.hardSkip, container,function (){SmartAva.utils.intxt_sc_smartIntxtEnd(container)})
            }
        },

        intxt_sc_smartIntxtEnd: function(container){
            try {
                sc_smartIntxtEnd()
            } catch(e) {
                console.log(e);
            }
            if (!container.id) container = VideoManager.ava.getElementIdCrossFrames(container);
            var intxtConf = top.Site_conf.intxt[SmartAva.utils.isMobile() ? "mobile" : "web"];
            if (typeof(intxtConf) != "undefined" && intxtConf.nonstop) {
                if (typeof top.sc_intext_cont == "undefined") {
                    top.sc_intext_cont = 0;
                }
                var reference = container.id + top.sc_intext_cont;
                top.sc_intext_cont++;
                var ref_element = '<div id="' + reference + '" ></div>';
                container.insertAdjacentHTML('beforebegin', ref_element);
                SmartAva.utils.startSmartIntext(reference,"intxt")
            }

        },
        hideElement: function (target){ //TEST if is still needed
            var element;
            VideoManager.ava.getElementIdCrossFrames(target.id) ? element = VideoManager.ava.getElementIdCrossFrames(target.id) : element = VideoManager.ava.getElementIdCrossFrames(SmartIntxt.config.elementContainer);
            element.style.display = 'none';
        },
        showElement: function (target){ //searches element by id and html node

            var element;
            target.id ? element = VideoManager.ava.getElementIdCrossFrames(target.id) : element = VideoManager.ava.getElementIdCrossFrames(target);
            element.style.opacity = "1";
            element.style.display = 'block'
        },

        getPlayerConfig : function (format){
            var response = {};
            var Ava_conf = VideoManager.ava.loadAvaConfDevice();
            var Inphoto_conf = top.Site_conf.inphoto[SmartAva.utils.isMobile() ? "mobile" : "web"];
            var intxt_conf = this.getIntxtConfig();


            switch (format) {
                case "ava":
                    response.playerId = Ava_conf.smaracd_player;
                    Ava_conf.placement ? response.plc = Ava_conf.placement : response.plc ="";
                    response.skipOffset = Ava_conf.skipOffset;
                    response.skipText = Ava_conf.skipText;
                    break;
            }
            return response
        },
        removeFixedClasses: function(patern) {
            var elements = top.document.getElementsByClassName(patern);
            for (i = 0; i < elements.length; i++) {
                var element = elements[i];
                element.classList.remove(patern);
                element.style.display = "none";
            }
        },
        createPositionReference: function(target) {

            if (typeof intext_element == "undefined") {
                if (!document.getElementById(target)) {
                    intext_element = top.document.getElementById(target);
                    setTimeout(function() {
                        SmartAva.utils.createPositionReference(target);
                    }, 100); //BLOCKED, smartIntxt element is not being created :-O
                } else {
                    intext_element = document.getElementById(target);
                }
            }
            var elementName = "sc-ava-" + Math.round(Math.random() * 1e8);
            var ref_element = '<div id="' + elementName + '"></div>';
            intext_element.insertAdjacentHTML('beforebegin', ref_element);
            return elementName;
        },

        resizeIntextIframe: function() {
            var iframe = document.getElementById(SmartIntxt.config.elementContainer + "-frame");
            if (!iframe) {
                iframe = top.document.getElementById(SmartIntxt.config.elementContainer + "-frame");
            }
            if (iframe) {
                var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                var vpaid_container = innerDoc.querySelectorAll("div[id*=vpaidSlot]");
                var videos = innerDoc.getElementsByTagName("video");
                var styles = {
                    height: "100%",
                    width: "100%"
                };
                if (vpaid_container && iframe) {
                    for (var i = 0; i < vpaid_container.length; i++) {
                        top.smartclipJquery(vpaid_container[i]).css(styles);
                        for (b = 0; vpaid_container[i].children.length > b; b++) {
                            top.smartclipJquery(vpaid_container[i].children[b]).css(styles);
                            for (var a = 0; a < vpaid_container[i].children[b].children.length; a++) {
                                top.smartclipJquery(vpaid_container[i].children[b].children[a]).css(styles);
                            }
                        }
                    }
                    var iframes = innerDoc.getElementsByTagName("iframe");
                    for (var i = 0; i < iframes.length; i++) {
                        top.smartclipJquery(iframes[i]).css(styles);
                    }

                }
            }
        },
        managePlayerPosition: function(containerReferencePosition, container, movePlayerTimes, alwaysVisible, Ava_conf, containerElementIsFormatted) {
            var result = {
                movePlayerTimes: movePlayerTimes,
                inView: null
            }
            if (movePlayerTimes < Ava_conf.movePlayerCap || Ava_conf.movePlayerCap == 0) {
                var refTop = top.smartclipJquery("#" + containerReferencePosition).offset().top; //Pixels from elementÃ‚Â´s top to top of document
                var refBot = refTop + top.smartclipJquery("#" + containerReferencePosition).width() / 16 * 9; //Pixels from elementÃ‚Â´s bottom to top of document
                SmartAva.utils.resizeIntextIframe();

                if (SmartAva.utils.isInview(refTop, refBot, Ava_conf.margin_bot, Ava_conf.margin_top)) {
                    result.inView = true;
                    if (alwaysVisible) {
                        //if(this.isFixed())
                        if (typeof container.classList != 'undefined' && container.classList.value == Ava_conf.fixedClass) { //TODO  poner nombres coherentes a esto

                            container.classList.remove(Ava_conf.fixedClass);
                            result.movePlayerTimes++;
                        }

                    } else {
                        //When initiated not fixed...

                        SmartAva.utils.startCallback(container);
                    }
                } else {
                    result.inView = false;
                    if (typeof container.classList == 'undefined' || container.classList == "" && alwaysVisible) {
                        SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                        result.movePlayerTimes++;
                    }
                }
            }
            return result;
        },

    init: function(container, Ava_conf) {
        var containerElementIsFormatted = false;
        if (typeof top.jQuery != "undefined") {
            top.smartclipJquery = top.jQuery;
            var containerPositionReference = SmartAva.utils.createPositionReference(container.id);
            if (Ava_conf.initFixed && !Ava_conf.onscroll) {
                SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                containerElementIsFormatted = true;
            }
            var movePlayerTimes = 0;
            if (Ava_conf.initFixed) {
                if (!Ava_conf.keepFixed) {

                    top.smartclipJquery(top.window).scroll(function() { // Warning pending remove listener on end.

                        if (!containerElementIsFormatted) {
                            SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);
                            containerElementIsFormatted = true;

                        }
                        var ManageResult = SmartAva.utils.managePlayerPosition(containerPositionReference, container, movePlayerTimes, true, Ava_conf, containerElementIsFormatted); //pass AVA element
                        containerElementIsFormatted = true
                        movePlayerTimes = ManageResult.movePlayerTimes;

                    });
                } else {
                    SmartAva.utils.addClassToElement(Ava_conf.fixedClass, container, containerElementIsFormatted);

                }
            } else {
                var alwaysVisible = false
                top.smartclipJquery(top.window).scroll(function() { // Warning pending remove listener on end.
                    var ManageResult = SmartAva.utils.managePlayerPosition(containerPositionReference, container, movePlayerTimes, alwaysVisible, Ava_conf, containerElementIsFormatted); //pass AVA element
                    if (ManageResult.inView) {
                        alwaysVisible = true;
                        containerElementIsFormatted = true
                    }

                    movePlayerTimes = ManageResult.movePlayerTimes;
                });

            }


        } else {
            if (typeof jQuery == "undefined") {
                SmartAva.utils.loadJsResources(SmartAva.config.js_dependencies); //LOAD JQUERY ONNLY
                setTimeout(function() {
                    SmartAva.init(container, Ava_conf);
                }, 200);
            }
        }
    }
};


VideoManager = {
    ava: {

        createAvaContainerAndStart: function(Ava_conf) {
            if (SmartIntxt.config.elementContainer == "") {
                var elementContainer = VideoManager.ava.getContainerElement();
                if (typeof elementContainer != "undefined") { //Create an element on Document where element locator did.... Then we use it as AVA container
                    elementContainer.innerHTML = "";
                    elementContainer.style = "";
                    var mandanga = '<div id="sc_smartAva"></div>';
                    elementContainer.insertAdjacentHTML("beforebegin", mandanga);
                    SmartIntxt.config.elementContainer = "sc_smartAva";

                    elementContainer = VideoManager.ava.getElementIdCrossFrames("sc_smartAva");

                    delete SmartPlay;

                } else {
                    setTimeout(function() {
                        VideoManager.ava.createAvaContainerAndStart(Ava_conf);
                    }, 200);
                }
            } else {
                elementContainer = VideoManager.ava.getElementIdCrossFrames(SmartIntxt.config.elementContainer);

                //TODO Test pretty well elementcontainer name is returned

            }
            if (typeof elementContainer != "undefined") {
                VideoManager.ava.ready(elementContainer, Ava_conf);
            } else {

            }

        },
        getContainerElement: function() {

            var a = VideoManager.ava.getElementsCrossFrames("div[id*=sc-]");
            var result;

            a.forEach(function(a) {
                if (a.id.indexOf("-backdrop") >= 0) {
                    result = a.parentElement;

                }
            });
            return result;
        },

        prepareDocumentForAva: function(Ava_conf) {
            VideoManager.ava.loadCssResources(Ava_conf);
            if (SmartIntxt.config.elementContainer == "") {
                SmartIntxt.init(); //Init intext so elements are included on page
            }
        },

        init: function() {
            top.SmartAva = SmartAva; // creating global object for external connections
            if (typeof avaConfRequested == 'undefined' || typeof top.Site_conf == 'undefined') { //conf is loadeed?
                VideoManager.ava.loadAvaConf();
                setTimeout(function() {
                    VideoManager.ava.init()
                }, 200);

            } else {

                var Ava_conf = VideoManager.ava.loadAvaConfDevice();
                Site_conf = top.Site_conf;
                VideoManager.ava.executeIntxtContainerPositioning();
                if (VideoManager.ava.discardAva(Ava_conf)) { //no Ava, regular
                    Site_conf = top.Site_conf;
                    //SmartIntxt.init();

                    SmartAva.utils.startSmartIntext(SmartIntxt.config.elementContainer,"intxt")
                    traditionalIntext = true;


                } else {
                    traditionalIntext = false
                    VideoManager.ava.prepareDocumentForAva(Ava_conf);
                    VideoManager.ava.createAvaContainerAndStart(Ava_conf);

                }




            }

        }
    }
};


VideoManager.ava.init();
VideoManager.inphoto.init();

 */

/***/ }),

/***/ "./src/lib/Ads/Ad/Video/OutStream/Intext.js":
/*!**************************************************!*\
  !*** ./src/lib/Ads/Ad/Video/OutStream/Intext.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ava; });
/* harmony import */ var _Base_AdService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Base/AdService */ "./src/lib/Ads/Ad/Base/AdService.js");
/* harmony import */ var _Network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Network */ "./src/lib/Network.js");
/* harmony import */ var _Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../Arch/SMCPromise */ "./src/lib/Arch/SMCPromise.js");




class Ava extends _Base_AdService__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    onInitialized(){
        this.loaded=false;
        this.loadPromise=Object(_Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_2__["default"])();

    }
    onConfigured(){
    }
    onReady(){}

    onEvent(id,slot,message) {
    }
    requestAd(ad)
    {
        let plc=ad.getServiceParam("Intext","plc");
        let contId=ad.getContainer().getId();
        ad.before("Displaying").wait(this.loadPromise);
        _Network__WEBPACK_IMPORTED_MODULE_1__["asyncLoad"]("https://des.smartclip.net/ads?type=dyn&sz=400x320&rnd=94632936&plc="+plc+"&elementId="+contId).then(()=>{
            this.loadPromise.resolve();
        });
    }
    displayAd(ad)
    {


    }
    configureAd(ad)
    {

    }

}



/***/ }),

/***/ "./src/lib/Ads/Ad/behaviours/Scheduled.js":
/*!************************************************!*\
  !*** ./src/lib/Ads/Ad/behaviours/Scheduled.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scheduled; });
/* harmony import */ var _Base_AdBehaviour__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Base/AdBehaviour */ "./src/lib/Ads/Ad/Base/AdBehaviour.js");


class Scheduled extends _Base_AdBehaviour__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    initialize()
    {
        let scheduler=this.serviceContainer.get("Scheduler");
        this.ad.before("Requesting").wait(scheduler.schedule(this.config));
    }
}



/***/ }),

/***/ "./src/lib/Ads/AdController/AdController.js":
/*!**************************************************!*\
  !*** ./src/lib/Ads/AdController/AdController.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AdController; });
/* harmony import */ var _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Arch/Promised */ "./src/lib/Arch/Promised.js");
/* harmony import */ var _Ad_Base_Ad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Ad/Base/Ad */ "./src/lib/Ads/Ad/Base/Ad.js");
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common */ "./src/lib/Common.js");




class AdController extends _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    constructor(serviceContainer,slotid,node,adConfig)
    {
        super();
        this.slotId=slotid;
        this.config=adConfig;
        this.domNode=node;
        this.serviceContainer=serviceContainer;
        this.mergeTags();
    }
    initialize()
    {
        this.slotConfig.container.value.node=this.domNode;
        this.container=this.serviceContainer.get("Container").getContainer(this.slotConfig.container);
        this.ad=new _Ad_Base_Ad__WEBPACK_IMPORTED_MODULE_1__["default"](this.serviceContainer,this.slotId,this.slotConfig,this.config);
        this.run(["Initialize","Run"])
    }
    onInitialize()
    {
        this.container.attachTo(this.domNode);
        this.container.initialize();
        this.ad.initialize();
        this.ad.attach(this.container);
        this.container.setAd(this.ad);


    }
    onRun()
    {


    }
    mergeTags()
    {

        this.slotConfig = _Common__WEBPACK_IMPORTED_MODULE_2__["deepmerge"]({},this.config.slots[this.slotId]);
        if(this.config.slots[this.slotId].tags==undefined) {
            return;
        }
        this.slotConfig.tags.map((tag)=>{
            if(this.config.tags[tag]!==undefined) {
                this.slotConfig = _Common__WEBPACK_IMPORTED_MODULE_2__["deepmerge"](this.slotConfig,this.config.tags[tag]);
            }
        })
        if(this.config.globalSlot!==undefined)
        {
            this.slotConfig=_Common__WEBPACK_IMPORTED_MODULE_2__["deepmerge"](this.slotConfig,this.cofig.globalSlot);
        }
    }
}


/***/ }),

/***/ "./src/lib/Ads/Container/BaseContainer.js":
/*!************************************************!*\
  !*** ./src/lib/Ads/Container/BaseContainer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseContainer; });
/* harmony import */ var _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Arch/Promised */ "./src/lib/Arch/Promised.js");
/* harmony import */ var _lib_DivNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/DivNode */ "./src/lib/Ads/Container/lib/DivNode.js");
/* harmony import */ var _Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Arch/SMCPromise */ "./src/lib/Arch/SMCPromise.js");





class BaseContainer extends _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__["default"]{
    constructor(ContainerService,config)
    {
        super();
        this.divNode=null;
        this.config=config;
    }
    initialize()
    {
        this.prependPromises({"gotAd":"Ready","attached":"Configured","destroy":"Destroyed"});
        this.run(["Created","Attached","Configured","Ready","Destroyed"]);
    }
    onCreated()
    {

    }
    onAttached()
    {
        this.divNode=new _lib_DivNode__WEBPACK_IMPORTED_MODULE_1__["default"](this.config);
    }
    onConfigured()
    {
        if(this.divNode &&typeof this.config.style!==undefined)
            this.divNode.applyStyles(this.config.style);


    }
    onReady()
    {

    }
    onDestroyed()
    {

    }
    attachTo(node)
    {
        this.divNode=node;
        this.resolve("attached");
    }
    getId()
    {
        return this.divNode.getId();
    }
    getNode(){return this.divNode;}
    destroy()
    {
        this.resolve("destroy");
    }
    setAd(ad)
    {
        this.ad=ad;
        this.resolve("gotAd");
    }
}


/***/ }),

/***/ "./src/lib/Ads/Container/ContainerService.js":
/*!***************************************************!*\
  !*** ./src/lib/Ads/Container/ContainerService.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContainerService; });
/* harmony import */ var _Service_Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Service/Service */ "./src/lib/Service/Service.js");

class ContainerService extends _Service_Service__WEBPACK_IMPORTED_MODULE_0__["default"] {
    onConfigured()
    {
        this.registeredContainers=this.config.containers;
    }
    onReady()
    {

    }
    registerContainer(type,module)
    {
        this.registeredContainers[type]=module;
    }
    getContainer(config)
    {
        let containerType=config.type;
        if(typeof this.registeredContainers[containerType]===undefined)
            throw "Unknown Container type:"+containerType;
        return new this.registeredContainers[containerType](this,config.value);
    }

}

/***/ }),

/***/ "./src/lib/Ads/Container/lib/DivNode.js":
/*!**********************************************!*\
  !*** ./src/lib/Ads/Container/lib/DivNode.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DivNode; });
/* harmony import */ var _Browser_CrossCompat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Browser/CrossCompat */ "./src/lib/Browser/CrossCompat.js");

const positionalProperties=["position","top","left","width","height","display","float"];
class DivNode
{
    constructor(nodeSpec)
    {
        this.node=null;
        this.properties={};
        if(nodeSpec.node !== undefined)
            this.node=nodeSpec.node;
        if(nodeSpec.id !== undefined)
            this.node=document.getElementById(nodeSpec.id);
        if(nodeSpec.query!==undefined) {
            var list= [].slice.call(document.querySelectorAll(nodeSpec.query));
            this.node=list.length>0?list[0]:null;
        }
        if(nodeSpec.tag!==undefined)
        {
            this.node=document.createElement(nodeSpec.tag);
            if(nodeSpec.parent!==null)
                this.nodeSpec.parent.appendChild(this.node);
        }
    }
    addChild(node)
    {
        if(this.node==null)return;
    }
    applyStyles(styles)
    {
        if(this.node==null) return;
        for (var k in styles)
            this.node.style[k] = styles[k];
    }
    getStyles(styles)
    {
        var res={};
        styles.map((i)=>res[i]=this.node.style[i]);
        return res;
    }
    getPositionalProperties()
    {
        return this.getStyles(positionalProperties);
    }
    getNode()
    {
        return this.node;
    }
    getId()
    {
        return this.node.id;
    }
    addProperty(key, value)
    {
        this.properties[key]=value;
    }
    removeProperty(key)
    {
        delete this.properties[key];
    }
    getProperty(key)
    {
        return this.properties[key] || null;
    }
    addClass(className)
    {
        // classList no es soportado en versiones anteriores a 10..
        var curClasses=this.node.className.split(" ").filter(function(f){return f!==className});
        curClasses.push(className);
        this.node.className=curClasses.join(" ");
    }
    removeClass(className)
    {
        this.node.className=this.node.className.split(" ").filter(function(f){return f!==className}).join(" ");
    }
}

/***/ }),

/***/ "./src/lib/Ads/PageManager/PageManager.js":
/*!************************************************!*\
  !*** ./src/lib/Ads/PageManager/PageManager.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageManager; });
/* harmony import */ var _Browser_Browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Browser/Browser */ "./src/lib/Browser/Browser.js");
/* harmony import */ var _Browser_Cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Browser/Cookie */ "./src/lib/Browser/Cookie.js");
/* harmony import */ var _Config_ConditionalConfig__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Config/ConditionalConfig */ "./src/lib/Config/ConditionalConfig.js");
/* harmony import */ var _Arch_Evented__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Arch/Evented */ "./src/lib/Arch/Evented.js");
/* harmony import */ var _AdController_AdController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AdController/AdController */ "./src/lib/Ads/AdController/AdController.js");







class PageManager extends _Arch_Evented__WEBPACK_IMPORTED_MODULE_3__["default"]
{
    constructor(serviceContainer,config)
    {
        super();
        this.serviceContainer=serviceContainer;
        this.rawConfig=config;
        this.adControllers={};
        this.divCounter=0;
        this.divPrefix="SM-"+(new Date().getTime())+"-";
        this.behaviours={};
    }
    initialize()
    {
        let ps=this.serviceContainer.get("PageStats");
        var stats=ps.getStats();
        let confParser=new _Config_ConditionalConfig__WEBPACK_IMPORTED_MODULE_2__["default"](this.rawConfig,
            {
                browser:_Browser_Browser__WEBPACK_IMPORTED_MODULE_0__["browserInfo"](),
                page:stats,
                getCookie:_Browser_Cookie__WEBPACK_IMPORTED_MODULE_1__["getCookie"]}
                );
        this.config=confParser.parse();

        if(this.config.behaviours!==undefined)
        {
            for(let k in this.config.behaviours)
            {
                let i=this.config.behaviours[k];
                let newI=new i.type(this.serviceContainer,this,i.config);
                newI.initialize();
                this.behaviours[k]=newI;
            }
        }

        if(SmartJs!==undefined)
        {
            let slots=SmartJs.slots;
            if(slots!==undefined)
                slots.map((c)=>this.register(c.s,c.n));
            let cmd=top.SmartJs.cmd;
            top.SmartJs=this;
            cmd.map((c)=>c.apply(this));
            this.cmd={push:(c)=>c.apply(this)}
        }
    }
    register(position,node)
    {
        if(this.config.slots[position]===undefined)
            return;
        if(this.config.slots[position].enabled===false)
            return;
        // Se obtiene una referencia al ultimo js ejecutado en la pagina
        let divNode=node;
        if(divNode===undefined) {
            let domNodes = document.getElementsByTagName("script");
            let scriptNode = domNodes[domNodes.length] - 1;
            divNode = scriptNode.parentNode();
        }
        var subDivNode=document.createElement("div");

        subDivNode.id=this.divPrefix+this.divCounter;
        divNode.appendChild(subDivNode);
        this.divCounter++;

        this.adControllers[subDivNode.id]=new _AdController_AdController__WEBPACK_IMPORTED_MODULE_4__["default"](
            this.serviceContainer,position,subDivNode,this.config
        );
        // Fire event.
        this.adControllers[subDivNode.id].initialize();
    }
}

/***/ }),

/***/ "./src/lib/Ads/PageManager/Test/PageManager.js":
/*!*****************************************************!*\
  !*** ./src/lib/Ads/PageManager/Test/PageManager.js ***!
  \*****************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Browser_CrossCompat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Browser/CrossCompat */ "./src/lib/Browser/CrossCompat.js");
/* harmony import */ var _Service_ServiceContainer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Service/ServiceContainer */ "./src/lib/Service/ServiceContainer.js");
/* harmony import */ var _Container_ContainerService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Container/ContainerService */ "./src/lib/Ads/Container/ContainerService.js");
/* harmony import */ var _Container_BaseContainer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../Container/BaseContainer.js */ "./src/lib/Ads/Container/BaseContainer.js");
/* harmony import */ var _Browser_Scheduler__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../Browser/Scheduler */ "./src/lib/Browser/Scheduler.js");
/* harmony import */ var _Ad_Display_GPT_GPTService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../Ad/Display/GPT/GPTService */ "./src/lib/Ads/Ad/Display/GPT/GPTService.js");
/* harmony import */ var _Ad_Display_AppNexus_AppNexusService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../Ad/Display/AppNexus/AppNexusService */ "./src/lib/Ads/Ad/Display/AppNexus/AppNexusService.js");
/* harmony import */ var _Log_ConsoleLogger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../Log/ConsoleLogger */ "./src/lib/Log/ConsoleLogger.js");
/* harmony import */ var _Ad_Video_OutStream_Ava__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Ad/Video/OutStream/Ava */ "./src/lib/Ads/Ad/Video/OutStream/Ava.js");
/* harmony import */ var _Ad_behaviours_Scheduled__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Ad/behaviours/Scheduled */ "./src/lib/Ads/Ad/behaviours/Scheduled.js");
/* harmony import */ var _Ad_Video_OutStream_Intext__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Ad/Video/OutStream/Intext */ "./src/lib/Ads/Ad/Video/OutStream/Intext.js");
/* harmony import */ var _PageManager__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../PageManager */ "./src/lib/Ads/PageManager/PageManager.js");
/* harmony import */ var _Browser_PageStats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../Browser/PageStats */ "./src/lib/Browser/PageStats.js");


// Las siguientes lineas deberian ser generadas












/* Comportamientos de containers */
//import ExpandOnScroll from '../behaviours/ExpandOnScroll';

let sContainer=new _Service_ServiceContainer__WEBPACK_IMPORTED_MODULE_1__["default"](null);
sContainer.loadServices({
    "Scheduler":{
        instance:_Browser_Scheduler__WEBPACK_IMPORTED_MODULE_4__["default"]
    },
    "Container":{
        instance:_Container_ContainerService__WEBPACK_IMPORTED_MODULE_2__["default"],
        config:{
            containers:{
                "Simple":_Container_BaseContainer_js__WEBPACK_IMPORTED_MODULE_3__["default"]
            },
            behaviours:{
                //"ExpandOnScroll":ExpandOnScroll
            }
        }
    },
    "PageStats":{
        instance:_Browser_PageStats__WEBPACK_IMPORTED_MODULE_12__["default"],
        config:{}
    },
    "Log":{
        instance:_Log_ConsoleLogger__WEBPACK_IMPORTED_MODULE_7__["default"],
        config:{}
    },
    "GPT":{
        instance:_Ad_Display_GPT_GPTService__WEBPACK_IMPORTED_MODULE_5__["default"],
        config:{}
    },
    "Intext":{
        instance:_Ad_Video_OutStream_Intext__WEBPACK_IMPORTED_MODULE_10__["default"],
        config:{}
    },
    "Ava":{
        instance:_Ad_Video_OutStream_Ava__WEBPACK_IMPORTED_MODULE_8__["default"],
        config:{}
    },
    "AppNexus":{
        instance:_Ad_Display_AppNexus_AppNexusService__WEBPACK_IMPORTED_MODULE_6__["default"],
        config:{
            member: 1024
        }
    }
});

let sampleAdConfig={
    tags:{
        "simpleContainer":{
            container: {

                "type": "Simple",
                "value": {
                    "style": {
                        "border": "1px solid black"
                    }
                }
            }
        },
        "roba": {
            ad: {
                sizes: [[300, 250]]
            }
        },

        "delayed":{
            "ad":{
                behaviours:{
                    "Scheduled":{type:_Ad_behaviours_Scheduled__WEBPACK_IMPORTED_MODULE_9__["default"],config:{when:"LOAD",timeout:3000}}
                }
            }
        },
        "banner":{
            "ad":{
                sizes:[980,200]
            }
        },
        "intext":{

            "ad":{
                adProvider: "Intext",
                "Intext": {
                    plc: "68005"
                }
            }
        },
        "gpt": {
            "ad":{adProvider:"GPT"}
        },
        "appNexus":{
            "ad":{
                adProvider:"AppNexus"
                }
        },
        "btf":{
            "ad": {
                "GPT": {
                    "adunit": "/5555/adconion.hogarutil.es/home"
                },
                "AppNexus": {
                    "adunit":11173262
                }
            }
        }
    },
    slots: {
        "default": {},
        "POSITION1": {
            enabled:true,
            tags: ["roba","btf","gpt","simpleContainer"],
        },
        "POSITION3": {
            enabled: true,
            tags:["roba","gpt","btf","simpleContainer","delayed"]
        },
        "POSITION2":{
            enabled:true,
            tags:["roba",{cond:{expr:"browser.device==\"desktop\" && rand() > 50",onTrue:"gpt",onFalse:"appNexus"}},"btf","simpleContainer"]

        }
    }
};


let inst=new _PageManager__WEBPACK_IMPORTED_MODULE_11__["default"](sContainer,sampleAdConfig);
inst.initialize();

/***/ }),

/***/ "./src/lib/Arch/Evented.js":
/*!*********************************!*\
  !*** ./src/lib/Arch/Evented.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Evented; });
class Evented {

    constructor() {
        this.listeners = {};
    }

    destruct() {
        if (this.runningListeners) {
            this.runningListeners.map(function (i) {
                i.target.removeListeners(this);
            })
        }
        // If this destructor was called while this object was notifying its listeners,
        // simply set a flag and return.
        if (this.notifying) {
            this.mustDestruct = true;
            return;
        }
        this.runningListeners = null;
        this.listeners = null;

    }

    addListener(evType, object, method, param, target) {
        if (!this.listeners[evType])
            this.listeners[evType] = [];

        var k;
        for (k = 0; k < this.listeners[evType].length; k++) {
            if (this.listeners[evType][k].obj == object && this.listeners[evType][k].method == method) {
                return;
            }
        }
        this.listeners[evType].push({
            obj: object,
            method: method,
            param: param,
            target: target
        });
    }

    removeListener(evType, object, method, target) {
        if (!this.listeners) return;
        if (!this.listeners[evType]) return;
        var k, curL;
        for (k = 0; k < this.listeners[evType].length; k++) {
            curL = this.listeners[evType][k];
            if (curL.obj == object && (!method || (method == curL.method))) {
                if (target) {
                    if (curL.target != target)
                        continue;
                }
                this.listeners[evType].splice(k, 1);
                if (object && object.removeRunningListener) {
                    object.removeRunningListener(this);
                }
                return;
            }
        }
    }

    removeListeners(object) {
        if (!this.listeners) return;
        var k, j;
        for (k in this.listeners) {
            for (j = 0; j < this.listeners[k].length; j++) {
                if (this.listeners[k][j].obj == object) {
                    this.listeners[k].splice(j, 1);
                    j--;
                }
            }
        }
    }

    notify(evType, data, target) {
        if (!this.listeners) return;
        if (!this.listeners[evType]) {
            return;
        }
        this.notifying = true;
        var k;
        var obj;
        for (k = 0; k < this.listeners[evType].length; k++) {
            obj = this.listeners[evType][k];
            if (obj.obj) {
                if (typeof obj.obj == "function") {
                    obj.obj(evType, data, obj.param, target);
                }
                else {
                    if (!obj.obj[obj.method])
                        continue;
                    obj.obj[obj.method](evType, data, obj.param, target);
                }
            }
            else {
                obj.method(evType, data, obj.param, target);
            }
        }
        // The following is a protection code; if marks this object as "notifying",so, if as part of the notification, this object
        // is destroyed, it will not destroy the listeners, but set the mustDestroy flag to true.
        this.notifying = false;
        if (this.mustDestroy) {
            this.listeners = null;
        }
    }

    fireEvent(event, data, target) {
        if (data !== null) {
            if (typeof data != "undefined")
                data.target = target;
            else
                data = {
                    target: target
                };
            data.src = this;
        }
        this.notify(event, data, target);
    }
}


/***/ }),

/***/ "./src/lib/Arch/Promised.js":
/*!**********************************!*\
  !*** ./src/lib/Arch/Promised.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Promised; });
/* harmony import */ var _SMCPromise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SMCPromise */ "./src/lib/Arch/SMCPromise.js");
/* harmony import */ var _Evented__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Evented */ "./src/lib/Arch/Evented.js");



class Promised extends _Evented__WEBPACK_IMPORTED_MODULE_1__["default"]
{
    constructor()
    {
        super()
        this._resolvePromises={};
        this._beforePromises={};
        this._finishedPromises={};
        this._promises={};
        this._afterCallbacks=[];
        this._currentState=null;
        this.nextState=null;
        this._postPromise={};
    }
    before(state)
    {
        this.addPromisedState(state);
        return {wait:(promise)=>this.addPromiseToState(state,promise)};
    }
    waitFinished(state)
    {
        if(this._finishedPromises[state]===undefined)
            this._finishedPromises[state]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();
        return this._finishedPromises[state];
    }
    addPromisedState(state)
    {
        if(this._beforePromises[state]===undefined) {
            this._beforePromises[state] = [];
            this._postPromise[state]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();
            this._promises[state]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();
        }
    }
    addPromiseToState(state,promise)
    {
        this.addPromisedState(state);
        this._beforePromises[state].push(promise);
    }
    /*
     if(this._beforePromises[state]===undefined) {
            this._beforePromises[state] = [];
            this._postPromise[state]=SMCPromise();
            this._promises[state]=SMCPromise();
        }
     */
    setState(state)
    {
        let execOwnCallback=()=>{
            let outCb="on"+this._currentState+"Finished";
            if(this[outCb])
                this[outCb].apply(this);
            if(this._finishedPromises[this._currentState]!==undefined)
                this._finishedPromises[this._currentState].resolve();

            if(this["on"+state])
                this["on"+state].apply(this);
        }
        let execCallbacks=function(){
            if(this._afterCallbacks[state]===undefined)
                return;
            this._afterCallbacks[state].map((f)=>f.apply(null));
        }.bind(this);

        if(this._beforePromises[state] === undefined) {
            return {
                then: (c) => {
                    execOwnCallback();
                    this._currentState=state;
                    execCallbacks();
                    c.apply(null);
                    if(this._finishedPromises[state]===undefined)
                        this._finishedPromises[state]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();
                    this._finishedPromises[state].resolve();

                }
            };
        }
        let localPromise=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();

        this._promises[state].all(this._beforePromises[state]).then(()=>{

            execOwnCallback();
            this._currentState=state;
            execCallbacks();
            this._postPromise[state].resolve();
            localPromise.resolve();

        })
        return localPromise;
    }
    run(stateArray)
    {
        let p=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();
        this.stateArray=stateArray;
        this.currentState=0;
        this._runStates(stateArray,p);

        return p;
    }
    _runStates(stateArray,endPromise)
    {
        if(this.currentState===stateArray.length)
            return endPromise.resolve();

        this.setState(stateArray[this.currentState]).then(()=>{
            if(this.nextState!==null)
            {
                this.currentState=this.nextState;
                this.nextState=null;
            }
            else
                this.currentState++;
            this._runStates(stateArray,endPromise);
        })
    }
    // Metodo semantico.Permite construcciones del tipo:
    // testI.before("A").wait(test2I.isInState("B"))
    isInState(state)
    {
        if(this._finishedPromises[state]!==undefined)
            return this._finishedPromises[state];
        this.addPromisedState(state)
        return this._postPromise[state];
    }
    gotoState(state)
    {
        this.nexState=this.stateArray.indexOf(state);
        if(this.nextState<0)
            this.nextState=null;
    }
    prependPromises(states)
    {
        for(let k in states)
        {
            if(this._resolvePromises[k]===undefined)
                this._resolvePromises[k]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])(k);
            this.before(states[k]).wait(this._resolvePromises[k]);
        }
    }
    resolve(state)
    {
        if(this._resolvePromises[state]===undefined)
            this._resolvePromises[state]=Object(_SMCPromise__WEBPACK_IMPORTED_MODULE_0__["default"])();

        this._resolvePromises[state].resolve();
    }
    discard(promises)
    {
        promises.map((i)=>{
            this._resolvePromises[i].resolve();
        });
    }
}



/***/ }),

/***/ "./src/lib/Arch/SMCPromise.js":
/*!************************************!*\
  !*** ./src/lib/Arch/SMCPromise.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SMCPromise; });
/* harmony import */ var _Common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common.js */ "./src/lib/Common.js");

    function g(h) {
        return _Common_js__WEBPACK_IMPORTED_MODULE_0__["isFunction"](h)
    }

    function defer(h) {
        //"undefined" != typeof setImmediate ? setImmediate(h) : "undefined" != typeof process && process.nextTick ? process.nextTick(h) : setTimeout(h, 0)
        h();
    }

    function SMCPromise(label) {
    let state;           // undefined/null = pending, true = fulfilled, false = rejected
    let values = [];     // an array of values as arguments for the then() handlers
    let deferred = [];   // functions to call when set() is invoked

    let set = function(newState, newValues) {
        return set.__resolve(newState,newValues);
    };
    set["resolve"]=function(val)
    {

        return set["__resolve"](true,val);
    }
    set["__resolve"]=function(newState,newValues)
    {

        if (state == null && newState != null) {
            state = newState;
            values = newValues;
            if (deferred.length)
                defer(function() {
                    for (let i = 0; i < deferred.length; i++)
                        deferred[i]();
                });
        }
        return state;
    };
    set["reject"]=function(){
        set.__resolve(false);
    };

    set["timeout"] = function (timeoutMs,value) {
            setTimeout(function () {
                set.resolve(value);
            }, timeoutMs);
            return set;
        };
    set["all"] = function (promiseArray) {
            if(!_Common_js__WEBPACK_IMPORTED_MODULE_0__["isset"](promiseArray) || promiseArray.length==0)
            {
                set.resolve([]);
            }
            else {
                let n = promiseArray.length;
                let result = new Array(n);
                promiseArray.map(function (p, i) {

                    p.then(function (res) {

                        result[i] = res;
                        n--;
                        if (n == 0) {
                            set.resolve([result])
                        };
                    }, function () {
                        set.reject();
                    })
                })
            }
            return set;
        };

    set['then'] = function (onFulfilled, onRejected) {

        let promise2 = SMCPromise(label);
        let callCallbacks = function() {
            try {
                let f = (state ? onFulfilled : onRejected);
                if (_Common_js__WEBPACK_IMPORTED_MODULE_0__["isFunction"](f)) {
                    let resolve= function(x) {
                        let then, cbCalled = 0;
                        try {
                            if (x && (_Common_js__WEBPACK_IMPORTED_MODULE_0__["isObject"](x) || _Common_js__WEBPACK_IMPORTED_MODULE_0__["isFunction"](x)) && _Common_js__WEBPACK_IMPORTED_MODULE_0__["isFunction"](then = x['then'])) {
                                if (x === promise2)
                                    throw new TypeError();
                                then['call'](x,
                                    function() { if (!cbCalled++) resolve.apply(undef,arguments); } ,
                                    function(value){ if (!cbCalled++) promise2(false,[value]);});
                            }
                            else
                                 promise2(true, arguments);
                        }
                        catch(e) {
                            if (!cbCalled++)
                                promise2(false, [e]);
                        }
                    }
                    resolve(f.apply(null, [values] || []));
                }
                else
                    promise2(state, values);
            }
            catch (e) {
                console.error("Excepcion en promesa:")
                console.dir(e);
                promise2(false, [e]);
            }
        };
        if (state != null)
            defer(callCallbacks);
        else
            deferred.push(callCallbacks);
        return promise2;
    };
    set.label=label;
    set.getState=function(){return state;}
    return set;
};


/***/ }),

/***/ "./src/lib/Browser/Browser.js":
/*!************************************!*\
  !*** ./src/lib/Browser/Browser.js ***!
  \************************************/
/*! exports provided: browserInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "browserInfo", function() { return browserInfo; });
/* harmony import */ var _Common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common.js */ "./src/lib/Common.js");

let ua="";
function getMatch(regex, pos)
{
    let match = ua.match(regex);
    return (match && match.length > 1 && match[pos]) || '';
}

function getFirst(regex)
{
    return getMatch(regex, 1);
}

function getSecond(regex)
{
    return getMatch(regex, 2);
}
function browserInfo() {

    try {
        let t = true;
        ua = window.navigator.userAgent;
        let r = function (rr) {
            return rr.test(ua);
        }


        let chromium=false,safari=false,googlebot=false;
        let iosdevice = getFirst(/(ipod|iphone|ipad)/i).toLowerCase()
            , android = r(/android/i)
            , chromeos = r(/CrOS/)
            , webos = r(/(web|hpw)os/i)
            , windowsphone = r(/windows phone/i)
            , windows = !windowsphone && r(/windows/i)
            , mac = !iosdevice && r(/macintosh/i)
            , linux = !android && !webos && r(/linux/i)
            , edgeVersion = getSecond(/edg([ea]|ios)\/(\d+(\.\d+)?)/i)
            , versionIdentifier = getFirst(/version\/(\d+(\.\d+)?)/i)
            , tablet = r(/tablet/i) && !r(/tablet pc/i)
            , mobile = !tablet && r(/[^-]mobi/i)
            , xbox = r(/xbox/i),
            name = null, version = null, osname = null, device = "desktop", blackberry = false;

        if (r(/opera/i)) {
            name = 'Opera';
            version = versionIdentifier || getFirst(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        } else if (r(/opr\/|opios/i)) {
            name = 'Opera';
            version = getFirst(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || versionIdentifier;
        }
        else if (r(/SamsungBrowser/i)) {
            name = 'Samsung Internet for Android';
            version = versionIdentifier || getFirst(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        }
        else if (windowsphone) {
            name = 'Windows Phone';
            osname = 'Windows Phone';
            if (edgeVersion)
                version = edgeVersion;
            else
                version = getFirst(/iemobile\/(\d+(\.\d+)?)/i)
        }
        else if (r(/msie|trident/i)) {
            name = 'Internet Explorer';
            version = getFirst(/(?:msie |rv:)(\d+(\.\d+)?)/i)
        } else if (chromeos) {
            name = 'Chrome'
            osname = 'Chrome OS';
            chromeos = true;
            version = getFirst(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        } else if (r(/edg([ea]|ios)/i)) {
            name = 'Microsoft Edge';
            version = edgeVersion;
        }
        else if (r(/firefox|iceweasel|fxios/i)) {
            name = 'Firefox';
            version = getFirst(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i);
            if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua))
                osname = 'Firefox OS'
        }
        else if (r(/blackberry|\bbb\d+/i) || r(/rim\stablet/i)) {
            name = 'BlackBerry';
            osname = 'BlackBerry OS';
            blackberry = t;
            version = versionIdentifier || getFirst(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
        }
        else if (webos) {
            name = 'WebOS';
            osname = 'WebOS';
            version = versionIdentifier || getFirst(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i);
        }
        else if (r(/chromium/i)) {
            name = 'Chromium';
            chromium = t;
            version = getFirst(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || versionIdentifier;
        }
        else if (r(/chrome|crios|crmo/i)) {
            name = 'Chrome';
            version = getFirst(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i);
        }
        else if (android) {
            name = 'Android';
            version = versionIdentifier;
        }
        else if (r(/safari|applewebkit/i)) {
            name = 'Safari';
            safari = t;
            if (versionIdentifier) {
                version = versionIdentifier
            }
        }
        else if (iosdevice) {
            name = iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod';
            if (versionIdentifier) {
                version = versionIdentifier
            }
        }
        else if (r(/googlebot/i)) {
            name = 'Googlebot';
            googlebot = t;
            version = getFirst(/googlebot\/(\d+(\.\d+))/i) || versionIdentifier;
        }
        else {
            name = getFirst(/^(.*)\/(.*) /),
                version = getSecond(/^(.*)\/(.*) /)
        }

        // set OS flags for platforms that have multiple browsers
        if (!windowsphone && android)
            osname = 'Android';
        else if (!windowsphone && iosdevice)
            osname = 'iOS';
        else if (mac)
            osname = 'macOS';
        else if (xbox)
            osname = 'Xbox';
        else if (windows)
            osname = 'Windows';
        else if (linux)
            osname = 'Linux';


        let getWindowsVersion = function (s) {

            let tt = {
                'NT': 'NT',
                'XP': 'XP',
                'NT 5.0': '2000',
                'NT 5.1': 'XP',
                'NT 5.2': '2003',
                'NT 6.0': 'Vista',
                'NT 6.1': '7',
                'NT 6.2': '8',
                'NT 6.3': '8.1',
                'NT 10.0': '10'
            };
            return typeof tt[s] == "undefined" ? null : tt[s];
        }

        // OS version extraction
        let osVersion = '';
        if (windows) {
            osVersion = getWindowsVersion(getFirst(/Windows ((NT|XP)( \d\d?.\d)?)/i))
        } else if (windowsphone) {
            osVersion = getFirst(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
        } else if (mac) {
            osVersion = getFirst(/Mac OS X (\d+([_\.\s]\d+)*)/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (iosdevice) {
            osVersion = getFirst(/os (\d+([_\s]\d+)*) like mac os x/i);
            osVersion = osVersion.replace(/[_\s]/g, '.');
        } else if (android) {
            osVersion = getFirst(/android[ \/-](\d+(\.\d+)*)/i);
        } else if (blackberry) {
            osVersion = getFirst(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
        }

        // device type extraction
        let osMajorVersion = !windows && osVersion.split('.')[0];
        if (!osMajorVersion) osMajorVersion = "";
        if (
            tablet
            || iosdevice == 'ipad'
            || (android && (osMajorVersion == 3 || (osMajorVersion >= 4 && !mobile)))
        ) {
            device = "tablet";
        } else if (
            mobile
            || iosdevice == 'iphone'
            || iosdevice == 'ipod'
            || android
            || blackberry
        ) {
            device = "mobile";
        }
        let wn = window.navigator;
        return {
            browserName: name,
            browserVersion: version,
            osName: osname,
            osVersion: osVersion,
            osMajorVersion: osMajorVersion,
            device: device,
            deviceCores: wn.hardwareConcurrency || 0,
            browserLanguage: wn.language || "",
            browserAgent: wn.userAgent
        }
    }
    catch(e){
        return {
            browserName: "",
            browserVersion: "",
            osName: "",
            osVersion: "",
            osMajorVersion: "",
            device: "",
            deviceCores: 0,
            browserLanguage: "",
            browserAgent: ""
        };
    }

}


/***/ }),

/***/ "./src/lib/Browser/Cookie.js":
/*!***********************************!*\
  !*** ./src/lib/Browser/Cookie.js ***!
  \***********************************/
/*! exports provided: setCookie, getCookie, eraseCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eraseCookie", function() { return eraseCookie; });
function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}

/***/ }),

/***/ "./src/lib/Browser/CrossCompat.js":
/*!****************************************!*\
  !*** ./src/lib/Browser/CrossCompat.js ***!
  \****************************************/
/*! exports provided: setDefaultWindow, onLoad, onReady, onUnload, isPageHidden, onBrowserVisibilityChange, onVisibilityChange, onPageHide, onPageShow, onResize, onScroll, onError, getViewportHeight, getViewportWidth, getPageWidth, getPageHeight, getVisibleViewportRect, getYScroll, getXScroll, getVisiblePercentage, getScreenPercentage, isInViewport, isPartiallyInViewport, getElementCoordinates, getScreenWidth, getScreenHeight */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultWindow", function() { return setDefaultWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onLoad", function() { return onLoad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onReady", function() { return onReady; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onUnload", function() { return onUnload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPageHidden", function() { return isPageHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBrowserVisibilityChange", function() { return onBrowserVisibilityChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onVisibilityChange", function() { return onVisibilityChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPageHide", function() { return onPageHide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPageShow", function() { return onPageShow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onResize", function() { return onResize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onScroll", function() { return onScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onError", function() { return onError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewportHeight", function() { return getViewportHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getViewportWidth", function() { return getViewportWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageWidth", function() { return getPageWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageHeight", function() { return getPageHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisibleViewportRect", function() { return getVisibleViewportRect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getYScroll", function() { return getYScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getXScroll", function() { return getXScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVisiblePercentage", function() { return getVisiblePercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenPercentage", function() { return getScreenPercentage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isInViewport", function() { return isInViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPartiallyInViewport", function() { return isPartiallyInViewport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElementCoordinates", function() { return getElementCoordinates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenWidth", function() { return getScreenWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScreenHeight", function() { return getScreenHeight; });
/* harmony import */ var _Geometry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Geometry.js */ "./src/lib/Browser/Geometry.js");


let defaultWindow=top;
function setDefaultWindow(w)
{
    defaultWindow=w;
}
function onLoad(callback,w=defaultWindow)
{
    if(w.document.readyState==="complete")
        return callback.apply();
    w.addEventListener("load", callback, false);
}
function onReady(callback,w=defaultWindow)
{
    if(w.document.readyState==="complete" || w.document.readyState==="interactive")
        return callback.apply();
    w.addEventListener("DOMContentLoaded", callback, false);
}
function onUnload(callback,w=defaultWindow)
{
    w.addEventListener("unload",callback, false);
}
function isPageHidden(w=defaultWindow)
{
    let d=w.document;
    let hidden="";
    if (d.hidden!==undefined) { // Opera 12.10 and Firefox 18 and later support
        hidden = "hidden";
    } else if (d.msHidden!==undefined) {
        hidden = "msHidden";
    } else if (d.webkitHidden!==undefined) {
        hidden = "webkitHidden";
    } else { return false; }
    return d[hidden];
}
function onBrowserVisibilityChange(callback,w=defaultWindow)
{
    let d=w.document;
    let visibilityChange=null;
    if (d.hidden!==undefined) { // Opera 12.10 and Firefox 18 and later support
        visibilityChange = "visibilitychange";
    } else if (d.msHidden!==undefined) {
        visibilityChange = "msvisibilitychange";
    } else if (d.webkitHidden!==undefined) {
        visibilityChange = "webkitvisibilitychange";
    } else { return false; }
    d.addEventListener(visibilityChange, callback, false);
}

function onVisibilityChange(element, callback, offset=0 )
{
    if(typeof window.IntersectionObserver!==null)
    {
        let thresholds=[];
        for(let k=0;k<11;k++)thresholds.push(k/10);
        let observer=new IntersectionObserver(callback,{root:null,rootMargin:offset+"px",threshold:thresholds});
        observer.observe(element);
    }
    else
    {
        (function(){
            let lastPercent=null;
            let f=function(){
                let vis=getVisiblePercentage(element);
                if(vis!==lastPercent && lastPercent!==null)
                    callback();
                lastPercent=vis;
            };
            setInterval(f,100);
        })();
    }
}

function onPageHide(callback,w=defaultWindow) {
    if ('onpagehide' in window)
        w.addEventListener('pagehide', callback);
}
function onPageShow(callback,w=defaultWindow) {
    if('onpageshow' in top )
        w.addEventListener('pageshow',callback);
}
function onResize(callback,w=defaultWindow)
{
    w.addEventListener('resize', callback, false);
}
function onScroll(callback,w=defaultWindow) {
    w.addEventListener('scroll', callback, true);
}
function onError(callback,w=defaultWindow)
{
    w.addEventListener('error', callback);
}
function getViewportHeight(w=defaultWindow) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerHeight || e.clientHeight || g.clientHeight;
};

function getViewportWidth(w=defaultWindow) {
    let d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];
    return w.innerWidth || e.clientWidth || g.clientWidth;
};
function getPageWidth(w=defaultWindow)
{
    return w.document.documentElement.offsetWidth;
}
function getPageHeight(w=defaultWindow)
{
    return w.document.documentElement.offsetHeight;
}
function getVisibleViewportRect(w=defaultWindow)
{
    let ys=getYScroll(w),xs=getXScroll(w);
    return {
        top:ys,bottom:ys+getViewportHeight(w),left:xs,right:xs+getViewportWidth(w)
    };
}
function getYScroll(w=defaultWindow){
    return (w.document.documentElement.scrollTop ?
        w.document.documentElement.scrollTop :
        w.document.body.scrollTop);
}
function getXScroll(w=defaultWindow)
{
    return (w.document.documentElement.scrollLeft ?
        w.document.documentElement.scrollLeft :
        w.document.body.scrollLeft);
}


function __isInViewport(el,offset=0,full=false,w=defaultWindow)
{
    let d = getElementCoordinates(el);
    let v = getVisibleViewportRect(w);
    if(!_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["withinRange"](v,d,offset))
        return false;
    if(!full)
        return true;
    return _Geometry_js__WEBPACK_IMPORTED_MODULE_0__["isSquareContained"](d,v);
}

function getPercentage(el,w,target="v")
{
    let d = getElementCoordinates(el);
    let v = getVisibleViewportRect(w);
    let i=_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["getIntersection"](d,v);
    if(i==null)
        return 0;
    return (_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["getArea"](i)/_Geometry_js__WEBPACK_IMPORTED_MODULE_0__["getArea"](target=="v"?v:d)).toFixed(2);
}
function getVisiblePercentage(el,w=defaultWindow)
{
    return getPercentage(el,w,"d")

}
function getScreenPercentage(el,w=defaultWindow)
{
    return getPercentage(el,w,"v")
}
function isInViewport(el,offset,w=defaultWindow)
{
    return __isInViewport(el,offset,true,w);
}
function isPartiallyInViewport(el,offset,w=defaultWindow)
{
    return __isInViewport(el,offset,false,w);
}


function getElementCoordinates(element)
{
        var theDiv = element;
        if (theDiv == null) return null;
        var addTop=0;
        var orDisplay=theDiv.style.display;
        var orParent=theDiv.parentElement;
        var oWidth=theDiv.offsetWidth;
        var oHeight=theDiv.offsetHeight;
        if(theDiv.style.display=='none')
        {

            var nt=theDiv.previousSibling;
            theDiv=null;
            try {
                while (nt != null && theDiv==null) {
                    nt = nt.previousSibling;
                    if(SMC.isset(nt.offsetHeight))
                    {
                        theDiv=nt;
                        addTop=nt.offsetHeight;

                    }

                }
                if(theDiv==null)
                    theDiv=theDiv.parentElement;
            }
            catch(e)
            {

            }
        }
        if (theDiv == null) return null;

        var target = theDiv,
            target_width = target.offsetWidth,
            target_height = target.offsetHeight,
            target_left = target.offsetLeft,
            target_top = target.offsetTop,
            gleft = 0,
            gtop = 0,
            rect = {};

        var moonwalk = function (_parent) {
            if (!!_parent) {
                gleft += _parent.offsetLeft;
                gtop += _parent.offsetTop;
                moonwalk(_parent.offsetParent);
            } else {
                return rect = {
                    top: target.offsetTop + gtop,
                    left: target.offsetLeft + gleft,
                    bottom: (target.offsetTop + gtop) + target_height,
                    right: (target.offsetLeft + gleft) + target_width
                };
            }
        };
        moonwalk(target.offsetParent);
        rect.divDisplay=orDisplay;
        rect.parentDisplay='block';
        rect.width=oWidth;
        rect.height=oHeight;
        while(orParent!=null)
        {
            if(orParent.style && orParent.style.display=="none")
            {
                rect.parentDisplay='none';
            }
            orParent=orParent.parentElement;
        }

        return rect;
}

function getScreenWidth() { return window.screen.width;}
function getScreenHeight() { return window.screen.height;}

let customStylesheet=null;
function addCSSRule(selector,rule)
{
    if(customStylesheet===null)
    {
        let node=document.createElement("style");
        node.appendChild(document.createTextNode(""));
        document.head.appendChild(node);
        customStylesheet=node.sheet;
    }
    if(customStylesheet.insertRule!==undefined)
        customStylesheet.insertRule(selector+" {"+rule+"}",-1);
    if(customStylesheet.addRule!==undefined)
        customStylesheet.addRule(selector,rule,-1);
}



/***/ }),

/***/ "./src/lib/Browser/Geometry.js":
/*!*************************************!*\
  !*** ./src/lib/Browser/Geometry.js ***!
  \*************************************/
/*! exports provided: withinRange, isSquareContained, getIntersection, getArea */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withinRange", function() { return withinRange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSquareContained", function() { return isSquareContained; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIntersection", function() { return getIntersection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getArea", function() { return getArea; });
// Devuelve true si la box v y d estan alejadas un maximo de offset entre si.
// Si offset es 0, significa que se intersectan
function withinRange(d,v,offset=0)
{
    let distances=[
        v.left - d.right, // El div demasiado a la izquierda.
        d.left-v.right, // Div demasiado a la derecha.
        v.top - d.bottom, // Div demasiado arriba.
        d.top - v.bottom // Div demasiado abajo.
    ];
    // Si cualquiera de los anteriores es positivo, no hay interseccion.
    let acc=0;
    for(let k=0;k<4;k++)
    {
        if(distances[k]>0)
            acc+=distances[k];
    }
    if(acc>0 && (offset==0 || offset < acc))
        return false;
    return true;
}

// v es el container, d es el contenido
function isSquareContained(d,v)
{
    return d.left >= v.left && d.right <=v.right && d.top >=v.top && d.bottom <=v.bottom;
}

function getIntersection(d,v)
{
    if(!withinRange(d,v,0))
        return null;
    let a={
        right:Math.min(d.right,v.right),
        left:Math.max(d.left,v.left),
        top:Math.max(d.top,v.top),
        bottom:Math.min(d.bottom,v.bottom)
    };
    return (a.right<0 || a.left<0 || a.top<0 || a.bottom<0)?null:a;
}
function getArea(d)
{
    return (d.right-d.left)*(d.bottom-d.top);
}

/***/ }),

/***/ "./src/lib/Browser/PageStats.js":
/*!**************************************!*\
  !*** ./src/lib/Browser/PageStats.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageStats; });
/* harmony import */ var _Service_Service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Service/Service */ "./src/lib/Service/Service.js");
/* harmony import */ var _Common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common.js */ "./src/lib/Common.js");
/* harmony import */ var _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CrossCompat.js */ "./src/lib/Browser/CrossCompat.js");
/* harmony import */ var _Geometry_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Geometry.js */ "./src/lib/Browser/Geometry.js");
/* harmony import */ var _Browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Browser */ "./src/lib/Browser/Browser.js");
/* harmony import */ var _UrlInfo__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./UrlInfo */ "./src/lib/Browser/UrlInfo.js");
/* harmony import */ var _Timing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Timing */ "./src/lib/Browser/Timing.js");







class PageStats extends _Service_Service__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    initialize(){
        this.enabled = true;
        this.w=this.config.window || window;
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["setDefaultWindow"](this.w);
        // Se comprueba si es posible obtener estadisticas de la ventana objetivo.
        try {
            let d=this.w.document;
            let w = this.w;
            this.accumShown=0;
            this.accumHidden=0;
            this.nShows=0;
            this.nHides=0;
            this.isHidden=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["isPageHidden"]();
            this.shownRef=0;
            this.processorSpeed=-1;
            this.networkSpeed=-1;

            this.pixelsScrolled=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getYScroll"]();
            this.currentScroll=this.pixelsScrolled;
            this.maxScroll=this.currentScroll;
            this.lastScrollTime=-1;
            this.firstScroll=-1;
            this.getProcessorSpeed();
            this.getNetworkSpeed();
            this.currentViewport=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getVisibleViewportRect"]();
            // Array de 5 elementos para almacenar los tiempos de visionado de cada 20% de la pagina.
            this.viewableZoneTimes=[0,0,0,0,0];
            this.nJsErrors=0;

            this.navigatorW=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getViewportWidth"](w);
            this.navigatorH=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getViewportHeight"](w);

            let hidFunc=(isHidden)=>{

                if(isHidden===this.isHidden)
                    return;
                this.isHidden=isHidden;
                this.nShows+=isHidden?0:1;
                this.nHides+=isHidden?1:0;
                this.updateShownTimings(isHidden);
            };
            this.scheduler=this.getService("Scheduler");
            this.scheduler.schedule({every:"PAGESHOW"},function(){hidFunc(false);})
            this.scheduler.schedule({every:"PAGEHIDE"},function(){hidFunc(true);})

            _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["onScroll"](()=>this.handleScroll());
            _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["onResize"](()=>this.handleScroll());
            _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["onError"](()=>this.nJsErrors++);
        }
        catch(e){
            this.enabled=false;
            console.dir(e);
        }
    }
    isEnabled(){return this.enabled;}
    updateShownTimings(isHidden)
    {
        let elapsed=this.relativeTimestamp(this.shownRef);
        this.accumShown+=isHidden?0:elapsed;
        this.accumHidden+=isHidden?elapsed:0;
        this.shownRef=this.relativeTimestamp();
    }
    relativeTimestamp(reference=0){
        return this.w.performance.now()-reference;
    }
    getStats(){
        let tims=(new Date()).getTime();
        let localUrl=new _UrlInfo__WEBPACK_IMPORTED_MODULE_5__["UrlInfo"](this.w.location);
        let pathParts=localUrl.getPathParts();
        let nParts=pathParts.length;
        let refererUrl=new _UrlInfo__WEBPACK_IMPORTED_MODULE_5__["UrlInfo"](this.w.document.referrer);
        let bInfo=null;
        bInfo = _Browser__WEBPACK_IMPORTED_MODULE_4__["browserInfo"]();
        let timings=_Timing__WEBPACK_IMPORTED_MODULE_6__["default"].getTimings();
        let w=this.w;
        let nRemoteScripts=null;

        if(w.document.querySelector)
        {
            nRemoteScripts=w.document.querySelectorAll("script[src]").length;
        }
        let origin=null;
        let originLength=0;
        let originList=null;
        if (w.location.ancestorOrigins) {
                originLength = w.location.ancestorOrigins.length;
                origin = w.location.ancestorOrigins[0];
                var originsTmp = [];
                for (var k =0; k< w.location.ancestorOrigins.length;k++){
                    originsTmp.push(w.location.ancestorOrigins[k]);
                }
                originList=originsTmp.join("|");
        }
        else
        {
            originLength=0;
            origin=w.location.origin;
        }
        let doNotTrack=false;
        if (window.doNotTrack || navigator.doNotTrack || navigator.msDoNotTrack || 'msTrackingProtectionEnabled' in window.external)
            doNotTrack=(window.doNotTrack == "1" || navigator.doNotTrack == "yes" || navigator.doNotTrack == "1" || navigator.msDoNotTrack == "1" || window.external.msTrackingProtectionEnabled())?true:false;

        let hasCMP="unknown";
        try {
            hasCMP=(top.__cmp!==undefined)
        }catch(e){}

        this.updateShownTimings(_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["isPageHidden"]());
        let data = {
            pixelsScrolled: this.pixelsScrolled,
            navigationStart: tims - Math.round(this.w.performance.now()),
            bodyWidth: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getPageWidth"](this.w),
            bodyHeight: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getPageHeight"](this.w),
            navigatorWidth: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getViewportWidth"](),
            navigatorHeight: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getViewportHeight"](),
            screenWidth: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getScreenWidth"](),
            screenHeight: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getScreenHeight"](),
            orientation: _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getScreenWidth"]()> _CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getScreenHeight"]()?"landscape":"portrait",
            processorSpeed: this.processorSpeed,
            networkSpeed: this.networkSpeed,
            viewableTime0: this.viewableZoneTimes[0],
            viewableTime20: this.viewableZoneTimes[1],
            viewableTime40: this.viewableZoneTimes[2],
            viewableTime60: this.viewableZoneTimes[3],
            viewableTime80: this.viewableZoneTimes[4],
            firstScroll: parseInt(this.firstScroll),
            maxScroll: this.maxScroll,
            referer: this.w.document.referrer,
            refererDomain: refererUrl.getRootHost(),
            origin:origin,
            originLength:originLength,
            originList:null,
            protocol: localUrl.getProtocol(),
            url: localUrl.getUrl(),
            domain: localUrl.getRootHost(),
            path1: nParts > 0 ? pathParts[0] : "",
            path2: nParts > 1 ? pathParts[1] : "",
            pageViewStart: (new Date().getTime()) - parseInt(this.w.performance.now()),
            pageViewTime: parseInt(this.w.performance.now()),
            nImages: this.w.document.getElementsByTagName("img").length,
            nScripts: this.w.document.getElementsByTagName("script").length,
            nVideos: this.w.document.getElementsByTagName('video').length,
            nIframes: w.document.getElementsByTagName('iframe').length,
            browserName: bInfo.browserName,
            browserVersion: bInfo.browserVersion,
            osName: bInfo.osName,
            osVersion: bInfo.osVersion,
            device: bInfo.device,
            deviceCores: bInfo.deviceCores,
            pageLoadTime: parseInt(timings.loadTime),
            pageLoadEvent: parseInt(timings.loadEventTime),
            pageReadyTime: parseInt(timings.readyTime),
            pageReadyEvent: parseInt(timings.readyEventTime),
            pageTransferSize: timings.transferSize || null,
            pageDecodedSize: timings.decodedBodySize || null,
            gotPageReady: document.readyState === "interactive" || document.readyState === "complete",
            gotPageLoad: document.readyState === "complete",
            headLength: (w.document.head && w.document.head.innerHTML) ? w.document.head.innerHTML.length : 0,
            bodyLength: (w.document.body && w.document.body.innerHTML) ? w.document.body.innerHTML.length : 0,
            nRemoteScripts: nRemoteScripts,
            netInfoDownlink: null,
            netInfoEffType: null,
            netInfoRtt: null,
            netInfoType: null,
            netInfoDownlinkMax: null,
            nPageHides: this.nHides,
            nPageShows: this.nShows,
            timeShowingPercent:Math.ceil(100*this.accumShown/this.w.performance.now()),
            jsErrors:this.nJsErrors,
            doNotTrack:doNotTrack,
            cmp:hasCMP
        };


        if(_Common_js__WEBPACK_IMPORTED_MODULE_1__["isset"](navigator.connection))
        {
            let fields=["downlink","effectiveType","rtt","type","downlinkMax"];
            let variables=["netInfoDownlink","netInfoEffType","netInfoRtt","netInfoType","netInfoDownlinkMax"];
            for(let k=0;k<fields.length;k++)
            {
                let cV=fields[k];
                if(_Common_js__WEBPACK_IMPORTED_MODULE_1__["isset"](navigator.connection[cV]))
                    data[variables[k]]=navigator.connection[cV];
            }
            if(isNaN(parseFloat(data.netInfoDownlink)))
                data.netInfoDownlink=0;
        }

        return data;
        }
        handleScroll()
        {

            let temp=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getYScroll"]();
            if(temp > this.maxScroll)
                this.maxScroll=temp;

            if(this.firstScroll===-1)
                this.firstScroll=this.relativeTimestamp();
            this.pixelsScrolled+=Math.abs(temp-this.currentScroll);
            let lastViewport=this.currentViewport;
            let elapsed=this.relativeTimestamp(this.lastScrollTime);
            let pageZoneHeight=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getPageHeight"]()/5;

            let pageWidth=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getPageWidth"]();
            let viewportArea=Math.max(1,_Geometry_js__WEBPACK_IMPORTED_MODULE_3__["getArea"](lastViewport));

            for(let k=0;k<5;k++)
            {
                let zoneCoords={left:0,right:pageWidth,top:k*pageZoneHeight,bottom:(k+1)*pageZoneHeight};
                let inters=_Geometry_js__WEBPACK_IMPORTED_MODULE_3__["getIntersection"](zoneCoords,lastViewport);
                if(inters)
                {
                    let screenPercent=_Geometry_js__WEBPACK_IMPORTED_MODULE_3__["getArea"](inters)/viewportArea;
                    this.viewableZoneTimes[k]+=parseInt(elapsed*screenPercent);
                }
            }
            this.currentViewport=_CrossCompat_js__WEBPACK_IMPORTED_MODULE_2__["getVisibleViewportRect"]();
            this.lastScrollTime=this.relativeTimestamp();
            this.currentScroll=temp;

    }
    getProcessorSpeed()
    {
        let t1 = this.w.performance.now();
        for (let t = 0; t < 20000; t++);
        this.processorSpeed = (this.w.performance.now() - t1);
    }
    getNetworkSpeed()
    {
        let imageAddr = this.config.cloudUrl+this.config.sampleFile;"spt.png";
        let downloadSize = this.config.sampleSize;
        let startTime=this.relativeTimestamp();
        let download = new Image();
        let j=this;
        download.onload = function () {
            j.networkSpeed=j.relativeTimestamp(startTime);
        };
        let cacheBuster = "?nnn=" + (new Date()).getTime();
        download.src = imageAddr + cacheBuster;


    }
}

/***/ }),

/***/ "./src/lib/Browser/Scheduler.js":
/*!**************************************!*\
  !*** ./src/lib/Browser/Scheduler.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Scheduler; });
/* harmony import */ var _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CrossCompat.js */ "./src/lib/Browser/CrossCompat.js");
/* harmony import */ var _Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Arch/SMCPromise.js */ "./src/lib/Arch/SMCPromise.js");
/* harmony import */ var _Service_Service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Service/Service */ "./src/lib/Service/Service.js");



let listeners = {};
let listenerCallbacks={};
let scrollListeners = [];
let unresolved=[];

class ScrollScheduler {
    constructor(sc) {
        this.scheduler = sc;
        sc.schedule({when: 'LOAD'}, () => this.refreshYPosition());
        this.elements = [];
        this.runningTimer = null;
        let m=this;

        let f = function () {
            /* Este timer sirve para evitar multiples llamadas durante un scroll o resize.
               Tiene que mantenerse al menos 50 milisegundos sin eventos, antes de comprobar posiciones.
             */
            if (m.runningTimer)
                clearTimeout(m.runningTimer);
                m.runningTimer = setTimeout(function () {
                m.runningTimer = null;
                m.checkElements();
            }, 50);
        };
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onResize"](f);
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onScroll"](f);
    }
    schedule(config)
    {
        config.offset = config.offset || 0;
        let p = Object(_Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
        if (CrossCompat.isInViewport(config.node,config.offset)) {
                p.resolve(config);
                return p;
        }
        config.promise = p;
        this.elements.push(config);
        return p;
    }
    checkElements () {
        if (this.elements.length === 0)
            return;
        unresolved = [];
        this.elements = this.elements.filter((e) => {
            if (CrossCompat.isInViewport(e.node, e.offset)) {
                e.promise.resolve();
                return false;
            }
            return true;
        });
    }
}


class Scheduler extends _Service_Service__WEBPACK_IMPORTED_MODULE_2__["default"]
{
    constructor(serviceContainer,config)
    {
        super(serviceContainer,config);
        this.listeners={};
        this.listenerCallbacks={};
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onLoad"](()=>this.resolve("LOAD"));
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onReady"](()=>this.resolve("READY"));
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onUnload"](()=>this.resolve("UNLOAD"));
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onBrowserVisibilityChange"](()=>{console.log("CHANGED VISIBILITY");this.resolve(_CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["isPageHidden"]()?"PAGEHIDE":"PAGESHOW")});
        _CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["onPageHide"](()=>this.resolve(_CrossCompat_js__WEBPACK_IMPORTED_MODULE_0__["isPageHidden"]()?"PAGEHIDE":"PAGESHOW"));

    }
    resolve(event)
    {
        if (this.listeners[event] == undefined )
            this.listeners[event]=Object(_Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

        this.listeners[event].resolve();

        if(this.listenerCallbacks[event]!= undefined)
        {
            this.listenerCallbacks[event].map(function(c){c.apply(null)});
        }
        this.fire(event);
    }
    buildEventPromise(event)
    {
        if (this.listeners[event]===undefined) {

            this.listeners[event]=Object(_Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
        }
        return this.listeners[event];
    }
    schedule(spec,cb)
    {
        if (spec == undefined || spec == null)
            spec = {};

        var m=this;
        let localPromise = Object(_Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])();


            // Wrapper 1 sobre el callback: resuelve la promesa local
            let ss = () => {
                localPromise.resolve();
                if(spec.fire!=undefined)
                    m.fire(spec.fire)
            };

            // Wrapper 2 sobre el callback: resuelve el timeout
            let t = null;
            if (spec.timeout) t = function () {
                setTimeout(ss, spec.timeout)
            };
            else
                t = ss;

            // Promesas : el scheduling solo se va a ejecutar una vez.

            if (spec.when!=undefined) {
                if (this.listeners[spec.when]===undefined)
                    this.listeners[spec.when] = Object(_Arch_SMCPromise_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
                this.listeners[spec.when].then(t);
                return localPromise;
            }

            // Eventos : el scheduling se va a ejecutar tantas veces como ocurra el evento.
        if(spec.every!=undefined)
        {
            if(m.listenerCallbacks[spec.every]==undefined)
                m.listenerCallbacks[spec.every]=[];
            m.listenerCallbacks[spec.every].push(cb);
            return;
        }
        // Para el scroll scheduler
            if (spec.offset){
                m.scrollScheduler.schedule(spec).then(t);
            }
        // En cualquier otro caso, se ejecuta directamente la resolucion de la promesa.
         t.apply(null);

        return localPromise;
    }
    // Se aniade un listener, en caso de que cb==undefined. Si no, se aniade un listenerCallback, lo cual tiene sentido si el evento que se espera es un "every".
    addListener(ev,cb)
    {
        let prom=buildEventPromise();
        if(cb != undefined)
        {
            this.listenerCallbacks[ev].push(cb);
            this.listeners[ev].then(cb);
        }
        return prom;
    }
    fire(ev) {
    if(this.listenerCallbacks[ev]!=undefined)
        this.listenerCallbacks[ev].map(function(f){f.apply()});
    };
}

/***/ }),

/***/ "./src/lib/Browser/Timing.js":
/*!***********************************!*\
  !*** ./src/lib/Browser/Timing.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Timing; });
class Timing {

    static relative() {
        switch(Timing.timingType)
        {
            case 0:{return null;}
            case 1:{return Timing.timestamp()-performance.timing.navigationStart;}
            case 2:{return performance.now();}
        }
    }

    static timestamp() {
        return new Date().getTime();
    }
    static beginMeasuring()
    {
        let start=Timing.timestamp();
        return {end:function(){return Timing.timestamp()-start;}}
    }

    static getTimings(w = top) {
        if (w.performance.getEntriesByType) {
            let res = w.performance.getEntriesByType("navigation");
            if (res.length == 1) {
                return Timing.getTimingsv2(res[0]);
            }
        }
        return Timing.getTimingsv1();
    }

    static getTimingsv2(props) {
        return {
            timingsVersion: 2,
            navigationStart: Timing.timestamp()-Timing.relative(),
            loadTime: props.domComplete,
            loadEventTime: props.loadEventEnd - props.loadEventStart,
            readyTime: props.domInteractive,
            readyEventTime: props.domContentLoadedEventEnd - props.domContentLoadedEventStart,
            networkTime: props.responseEnd - props.requestStart,
            transferSize: props.transferSize,
            decodedBodySize: props.decodedBodySize
        };
    }

    static getTimingsv1() {
        let base = performance.timing;
        if (base === undefined) {
            return {
                timingsVersion: 0,
                navigationStart:null,
                loadTime: null,
                loadEventTime: null,
                readyTime: null,
                readyEventTime: null,
                networkTime: null,
                transferSize: null,
                decodedBodySize: null
            };
        }
        let reference = base.connectStart;
        return {
            timingsVersion: 1,
            navigationStart: reference,
            loadTime: base.domComplete - reference,
            loadEventTime: base.loadEventEnd - base.loadEventStart,
            readyTime: base.domInteractive - reference,
            readyEventTime: base.domContentLoadedEventEnd - base.domContentLoadedEventStart,
            networkTime: base.responseEnd - base.requestStart,
            transferSize: null,
            decodedBodySize: null
        }
    }
}
if (window.performance.getEntriesByType)
    Timing.timingType=2;
else
{
    if(window.performance.timing)
        Timing.timingType=1;
    else {
        Timing.timingType = 0;
    }
}


/***/ }),

/***/ "./src/lib/Browser/UUID.js":
/*!*********************************!*\
  !*** ./src/lib/Browser/UUID.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UUID; });
// FROM : https://github.com/kelektiv/node-uuid

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var rng=null;
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
    (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
    // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
    var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
    rng=function() {
        getRandomValues(rnds8);
        return rnds8;
    };
} else {
    // Math.random()-based (RNG)
    //
    // If all else fails, use Math.random().  It's fast, but is of unspecified
    // quality.
    var rnds = new Array(16);

    rng = function() {
        for (var i = 0, r; i < 16; i++) {
            if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
            rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
        }

        return rnds;
    };
}

var byteToHex = [];
for (var i = 0; i < 256; ++i) {
    byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
    var i = offset || 0;
    var bth = byteToHex;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]]]).join('');
}

// Implementa UUID v4 de esa lilbreria.
function UUID(options, buf, offset)
{
        var rnds = rng();
        // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
        rnds[6] = (rnds[6] & 0x0f) | 0x40;
        rnds[8] = (rnds[8] & 0x3f) | 0x80;
        return bytesToUuid(rnds);
}

/***/ }),

/***/ "./src/lib/Browser/UrlInfo.js":
/*!************************************!*\
  !*** ./src/lib/Browser/UrlInfo.js ***!
  \************************************/
/*! exports provided: UrlInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UrlInfo", function() { return UrlInfo; });
class UrlInfo
{
    constructor(url)
    {
        this.alink=document.createElement("a");
        this.alink.href=url;
    }
    getUrl()
    {
        return this.alink.href;
    }
    getProtocol()
    {
        return this.alink.protocol;
    }
    getHost()
    {
        return this.alink.host;
    }
    getRootHost()
    {
        let exceptions=["co.uk","co.br"];
        let dom=this.getHost();
        let nParts=2;
        // se elimina el puerto si existe.
        let np=dom.split(":");
        dom=np[0];
        let domSp=dom.split(".");
        // Si todos los elementos del dominio son numericos, es una direccion IP, y la de
        if(domSp.filter(function(i){return parseInt(i)==i;}).length==domSp.length)
            return dom;

        for(let h=0;h<exceptions.length;h++)
        {

            let pos=dom.lastIndexOf("."+exceptions[h]);
            if(pos>0 && pos+sl==dom.length) {
                nParts = exceptions[k].split(".").length + 1;
                break;
            }
        }
        return dom.split(".").reverse().slice(0,nParts).reverse().join(".");
    }
    getPath()
    {
        return this.alink.pathname;
    }
    getPathParts()
    {
        return this.alink.pathname.split("/").filter(function(it){return it==""?null:it;});
    }
}


/***/ }),

/***/ "./src/lib/Common.js":
/*!***************************!*\
  !*** ./src/lib/Common.js ***!
  \***************************/
/*! exports provided: isFunction, isObject, isArray, isString, isset, issetOr, deepmerge */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isset", function() { return isset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "issetOr", function() { return issetOr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepmerge", function() { return deepmerge; });
function isFunction(f) {
    return typeof f == 'function';
}
function isObject(f) {
    return typeof f == 'object';
}

function isArray  (l) {
    return l.constructor.toString().indexOf("Array")>0;
};
function isString(l)
{
    return typeof l==="string";
}
function isset  (l) {
    return typeof l != "undefined";
};
function issetOr (l, o) {
    return isset(l) ? l : o;
};
function isMergeableObject(val) {
    var nonNullObject = val && typeof val === 'object'

    return nonNullObject
        && Object.prototype.toString.call(val) !== '[object RegExp]'
        && Object.prototype.toString.call(val) !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true
    return (clone && isMergeableObject(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice()
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument)
        } else if (isMergeableObject(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument)
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument))
        }
    })
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {}
    if (isMergeableObject(target)) {
        Object.keys(target).forEach(function (key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument)
        })
    }
    Object.keys(source).forEach(function (key) {
        if (!isMergeableObject(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument)
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument)
        }
    })
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var array = Array.isArray(source);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge }
    var arrayMerge = options.arrayMerge || defaultArrayMerge

    if (array) {
        return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) : cloneIfNecessary(source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
}



/***/ }),

/***/ "./src/lib/Config/ConditionalConfig.js":
/*!*********************************************!*\
  !*** ./src/lib/Config/ConditionalConfig.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConditionalConfig; });
/* harmony import */ var _Parser_Conditionals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Parser/Conditionals */ "./src/lib/Parser/Conditionals.js");
/* harmony import */ var _Parser_Conditionals__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Parser_Conditionals__WEBPACK_IMPORTED_MODULE_0__);

class ConditionalConfig
{
    constructor(config,properties)
    {
        this.config=config;
        this.properties=properties;
        //Parser.parse
    }
    parse()
    {
        return this.traverse(this.config);
    }

    checkCond(obj)
    {
        if(obj===null || obj===undefined)
            return obj;

        switch(typeof obj.cond)
        {
            case "undefined":{return obj;}
            case "string":{return _Parser_Conditionals__WEBPACK_IMPORTED_MODULE_0__["parse"](obj.cond,{properties:this.properties})}
            default:
            {
                if(typeof obj.cond.expr=="undefined")
                    return obj;
                let b=_Parser_Conditionals__WEBPACK_IMPORTED_MODULE_0__["parse"](obj.cond.expr,{properties:this.properties});
                if(b && obj.cond.onTrue!=undefined)
                    return obj.cond.onTrue;
                if(!b && obj.cond.onFalse!=undefined)
                    return obj.cond.onFalse;
                return null;
            }
        }
    }

    traverse (x) {
        if (Object.prototype.toString.call(x) === '[object Array]')
        {
            return this.traverseArray(x)
        } else if ((typeof x === 'object') && (x !== null)) {
            return this.traverseObject(x)
        } else {
            return x;
        }
    }
    traverseArray (arr) {
        let result=[];
        arr.forEach((x)=> {
            let newVal=this.checkCond(x);
            result.push(this.traverse(newVal))
        })
        return result;
    }
    traverseObject (obj) {
        var result={};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                let newVal=this.checkCond(obj[key]);
                result[key]=this.traverse(newVal);
            }
        }
        return result;
    }


}

/***/ }),

/***/ "./src/lib/Log/BaseLogger.js":
/*!***********************************!*\
  !*** ./src/lib/Log/BaseLogger.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseLogger; });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common */ "./src/lib/Common.js");

class BaseLogger
{
    constructor(config)
    {
        this.globalLog={};
        this.adLog={};
        this.requestLog={};
        this.config=config;
    }
    initialize()
    {

    }
    log(text)
    {
        console.log(text);
    }
    logGlobal(data)
    {
        _Common__WEBPACK_IMPORTED_MODULE_0__["deepmerge"](this.globalLog,data,{});
    }
    logAd(data)
    {

    }
    logRequest(data)
    {
        let reqId=data.id;
        if(typeof this.requestLog[id]===undefined)
            return this.requestLog[id]=data;
        else
            _Common__WEBPACK_IMPORTED_MODULE_0__["deepmerge"]( this.requestLog[id],data,{});
    }
    debug(text)
    {
        if(typeof text==="string")
            return console.log(text);
        console.dir(text);
    }
}

/***/ }),

/***/ "./src/lib/Log/ConsoleLogger.js":
/*!**************************************!*\
  !*** ./src/lib/Log/ConsoleLogger.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConsoleLogger; });
/* harmony import */ var _BaseLogger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseLogger */ "./src/lib/Log/BaseLogger.js");
/* harmony import */ var _Common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common.js */ "./src/lib/Common.js");


class ConsoleLogger extends _BaseLogger__WEBPACK_IMPORTED_MODULE_0__["default"]
{
    debug(txt)
    {
        if(!_Common_js__WEBPACK_IMPORTED_MODULE_1__["isArray"](txt))
            txt=[txt];
        for(var k=0;k<txt.length;k++)
        {
            if(typeof txt[k]==="string")
                console.log(txt[k]);
            else
                console.dir(txt[k]);
        }
    }
    log(index,sourceData,inmediate=0)
    {
        let dstam=new Date();

        for(let k in sourceData)
        {
            let c=sourceData[k];
            console.debug("["+index+"]"+k);
            for(let j in c)
            {
                console.debug("["+index+"]:"+k+":"+j+"="+c[j]);
            }
        }
    }
}

/***/ }),

/***/ "./src/lib/Network.js":
/*!****************************!*\
  !*** ./src/lib/Network.js ***!
  \****************************/
/*! exports provided: asyncLoad */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asyncLoad", function() { return asyncLoad; });
/* harmony import */ var _Common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Common */ "./src/lib/Common.js");
/* harmony import */ var _Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Arch/SMCPromise */ "./src/lib/Arch/SMCPromise.js");



function asyncLoad (url, notAsync) {
    var p = Object(_Arch_SMCPromise__WEBPACK_IMPORTED_MODULE_1__["default"])();
    var pbjsEl = document.createElement("script");
    pbjsEl.type = "text/javascript";
    if (!Object(_Common__WEBPACK_IMPORTED_MODULE_0__["isset"])(notAsync) || notAsync == false) pbjsEl.async = true;
    pbjsEl.src = url;
    if (document.body) document.body.appendChild(pbjsEl);
    else {
        var pbjsTargetEl = document.getElementsByTagName("head")[0];
        pbjsTargetEl.insertBefore(pbjsEl, pbjsTargetEl.firstChild);
    }
    pbjsEl.onload = pbjsEl.onreadystatechange =  ()=> {
        pbjsEl.onload = pbjsEl.onreadystatechange = null;
        p(true);
    };
    return p;
};

/***/ }),

/***/ "./src/lib/Parser/Conditionals.js":
/*!****************************************!*\
  !*** ./src/lib/Parser/Conditionals.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
  DEFINICION DEL PARSER usando PEG.js : https://pegjs.org/online
  Al constructor, en el objeto options, se pasa una propiedad "properties", que son los objetos
  que se pueden consultar desde las reglas.
  A este objeto properties se le añade una funcion rand();
  Sobre el parser generado, hay que hacer una modificacion, que es:
  Hay un parametro "options" pasado al metodo parse que hay que hacer que esté disponible
  en el método resolveProperty.Para ello, ese parametro se asigna a una variable globlalOptions
  cuyo ambito es la funcion global.

{

    var properties={
        "rand":function(){return parseInt(Math.random()*100);},
        "a":{
            "d":function(){
                return "hola";
            },
            "b":{
                "c":99
            }
            ,
            "e":function(a,b,c){console.log("A VALE "+c);}
        }
    };
    function resolveProperty(obj,subProps)
    {
        var root=properties[obj];
        var i=0;
        while(i<subProps.length && typeof root!="undefined")
            root=root[subProps[i++]];
        return root;
    }
    function parseCondition(left,operand,right)
    {
        switch(operand)
        {
            case "==":{return left==right;}break;
            case "!=":{return left != right;}break;
            case ">":{return parseInt(left)>parseInt(right);}break;
            case "<":{return parseInt(left)<parseInt(right);}break;
            case "matches":{var r=new RegExp(right);return r.test(left);}
        }
    }
    function parseBoolean(left,more)
    {
        var l=left;
        for(var i=0;i<more.length;i++)
        {
            var c=more[i];
            switch(c[1])
            {
                case "||":{l=( l || c[3])}break;
                case "&&":{l=( l && c[3])}break;
            }
        }
        return l;
    }
    console.log("INIT");
}
Expression = left:Factor more:( _ operand:( "&&" / "||") _ right:Factor)* {if(more.length==0)return left; return parseBoolean(left,more);}
Factor = "(" _ expr:Expression _ ")" {return expr;} / Condition
Condition = left:Token _ operand:( "==" / "!="/  ">" / "<" / "matches" ) _ right:Token {return parseCondition(left,operand,right);}
Token =   prop:PropertyAccess "(" params:(_ Token _ ("," _ Token)* _)? ")" { var p=[];if(params!=null){p=[params[1]];params[3].map((item)=>p.push(item[2]))}return prop.apply(null,p); } / PropertyAccess / StringLiteral / Number
PropertyAccess = obj:String subprops:SubProperty* {return resolveProperty(obj,subprops);}
SubProperty = "." cad:String {return cad;}
Number = cad:[0-9]+ {return parseInt(cad.join(""));}
String = cad:([a-zA-Z][a-zA-Z_0-9]*) {return cad[0]+cad[1].join("")}
StringLiteral "stringLiteral"
    = '"' chars:[^\"]* '"' {return chars.join("");}

_ "whitespace"
    = [ \t\n\r]*

*/

module.exports = /*
 * Generated by PEG.js 0.10.0.
 *
 * http://pegjs.org/
 */
    (function() {
        "use strict";
        var globalOptions;
        function peg$subclass(child, parent) {
            function ctor() { this.constructor = child; }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
        }

        function peg$SyntaxError(message, expected, found, location) {
            this.message  = message;
            this.expected = expected;
            this.found    = found;
            this.location = location;
            this.name     = "SyntaxError";

            if (typeof Error.captureStackTrace === "function") {
                Error.captureStackTrace(this, peg$SyntaxError);
            }
        }

        peg$subclass(peg$SyntaxError, Error);

        peg$SyntaxError.buildMessage = function(expected, found) {
            var DESCRIBE_EXPECTATION_FNS = {
                literal: function(expectation) {
                    return "\"" + literalEscape(expectation.text) + "\"";
                },

                "class": function(expectation) {
                    var escapedParts = "",
                        i;

                    for (i = 0; i < expectation.parts.length; i++) {
                        escapedParts += expectation.parts[i] instanceof Array
                            ? classEscape(expectation.parts[i][0]) + "-" + classEscape(expectation.parts[i][1])
                            : classEscape(expectation.parts[i]);
                    }

                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                },

                any: function(expectation) {
                    return "any character";
                },

                end: function(expectation) {
                    return "end of input";
                },

                other: function(expectation) {
                    return expectation.description;
                }
            };

            function hex(ch) {
                return ch.charCodeAt(0).toString(16).toUpperCase();
            }

            function literalEscape(s) {
                return s
                    .replace(/\\/g, '\\\\')
                    .replace(/"/g,  '\\"')
                    .replace(/\0/g, '\\0')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
            }

            function classEscape(s) {
                return s
                    .replace(/\\/g, '\\\\')
                    .replace(/\]/g, '\\]')
                    .replace(/\^/g, '\\^')
                    .replace(/-/g,  '\\-')
                    .replace(/\0/g, '\\0')
                    .replace(/\t/g, '\\t')
                    .replace(/\n/g, '\\n')
                    .replace(/\r/g, '\\r')
                    .replace(/[\x00-\x0F]/g,          function(ch) { return '\\x0' + hex(ch); })
                    .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return '\\x'  + hex(ch); });
            }

            function describeExpectation(expectation) {
                return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
            }

            function describeExpected(expected) {
                var descriptions = new Array(expected.length),
                    i, j;

                for (i = 0; i < expected.length; i++) {
                    descriptions[i] = describeExpectation(expected[i]);
                }

                descriptions.sort();

                if (descriptions.length > 0) {
                    for (i = 1, j = 1; i < descriptions.length; i++) {
                        if (descriptions[i - 1] !== descriptions[i]) {
                            descriptions[j] = descriptions[i];
                            j++;
                        }
                    }
                    descriptions.length = j;
                }

                switch (descriptions.length) {
                    case 1:
                        return descriptions[0];

                    case 2:
                        return descriptions[0] + " or " + descriptions[1];

                    default:
                        return descriptions.slice(0, -1).join(", ")
                            + ", or "
                            + descriptions[descriptions.length - 1];
                }
            }

            function describeFound(found) {
                return found ? "\"" + literalEscape(found) + "\"" : "end of input";
            }

            return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
        };

        function peg$parse(input, options) {
            globalOptions=options;
            if(typeof globalOptions.properties=="undefined")
                globalOptions.properties={};
            globalOptions.properties.rand=function(){var lastResult=parseInt(Math.random()*100);return lastResult;}
            options = options !== void 0 ? options : {};

            var peg$FAILED = {},

                peg$startRuleFunctions = { Expression: peg$parseExpression },
                peg$startRuleFunction  = peg$parseExpression,

                peg$c0 = "&&",
                peg$c1 = peg$literalExpectation("&&", false),
                peg$c2 = "||",
                peg$c3 = peg$literalExpectation("||", false),
                peg$c4 = function(left, more) {if(more.length==0)return left; return parseBoolean(left,more);},
                peg$c5 = "(",
                peg$c6 = peg$literalExpectation("(", false),
                peg$c7 = ")",
                peg$c8 = peg$literalExpectation(")", false),
                peg$c9 = function(expr) {return expr;},
                peg$c10 = "==",
                peg$c11 = peg$literalExpectation("==", false),
                peg$c12 = "!=",
                peg$c13 = peg$literalExpectation("!=", false),
                peg$c14 = ">",
                peg$c15 = peg$literalExpectation(">", false),
                peg$c16 = "<",
                peg$c17 = peg$literalExpectation("<", false),
                peg$c18 = "matches",
                peg$c19 = peg$literalExpectation("matches", false),
                peg$c20 = function(left, operand, right) {return parseCondition(left,operand,right);},
                peg$c21 = ",",
                peg$c22 = peg$literalExpectation(",", false),
                peg$c23 = function(prop, params) { var p=[];if(params!=null){p=[params[1]];params[3].map((item)=>p.push(item[2]))}return prop.apply(null,p); },
                peg$c24 = function(obj, subprops) {return resolveProperty(obj,subprops);},
                peg$c25 = ".",
                peg$c26 = peg$literalExpectation(".", false),
                peg$c27 = function(cad) {return cad;},
                peg$c28 = /^[0-9]/,
                peg$c29 = peg$classExpectation([["0", "9"]], false, false),
                peg$c30 = function(cad) {return parseInt(cad.join(""));},
                peg$c31 = /^[a-zA-Z]/,
                peg$c32 = peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
                peg$c33 = /^[a-zA-Z_0-9]/,
                peg$c34 = peg$classExpectation([["a", "z"], ["A", "Z"], "_", ["0", "9"]], false, false),
                peg$c35 = function(cad) {return cad[0]+cad[1].join("")},
                peg$c36 = peg$otherExpectation("stringLiteral"),
                peg$c37 = "\"",
                peg$c38 = peg$literalExpectation("\"", false),
                peg$c39 = /^[^"]/,
                peg$c40 = peg$classExpectation(["\""], true, false),
                peg$c41 = function(chars) {return chars.join("");},
                peg$c42 = peg$otherExpectation("whitespace"),
                peg$c43 = /^[ \t\n\r]/,
                peg$c44 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false),

                peg$currPos          = 0,
                peg$savedPos         = 0,
                peg$posDetailsCache  = [{ line: 1, column: 1 }],
                peg$maxFailPos       = 0,
                peg$maxFailExpected  = [],
                peg$silentFails      = 0,

                peg$result;

            if ("startRule" in options) {
                if (!(options.startRule in peg$startRuleFunctions)) {
                    throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
                }

                peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
            }

            function text() {
                return input.substring(peg$savedPos, peg$currPos);
            }

            function location() {
                return peg$computeLocation(peg$savedPos, peg$currPos);
            }

            function expected(description, location) {
                location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

                throw peg$buildStructuredError(
                    [peg$otherExpectation(description)],
                    input.substring(peg$savedPos, peg$currPos),
                    location
                );
            }

            function error(message, location) {
                location = location !== void 0 ? location : peg$computeLocation(peg$savedPos, peg$currPos)

                throw peg$buildSimpleError(message, location);
            }

            function peg$literalExpectation(text, ignoreCase) {
                return { type: "literal", text: text, ignoreCase: ignoreCase };
            }

            function peg$classExpectation(parts, inverted, ignoreCase) {
                return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
            }

            function peg$anyExpectation() {
                return { type: "any" };
            }

            function peg$endExpectation() {
                return { type: "end" };
            }

            function peg$otherExpectation(description) {
                return { type: "other", description: description };
            }

            function peg$computePosDetails(pos) {
                var details = peg$posDetailsCache[pos], p;

                if (details) {
                    return details;
                } else {
                    p = pos - 1;
                    while (!peg$posDetailsCache[p]) {
                        p--;
                    }

                    details = peg$posDetailsCache[p];
                    details = {
                        line:   details.line,
                        column: details.column
                    };

                    while (p < pos) {
                        if (input.charCodeAt(p) === 10) {
                            details.line++;
                            details.column = 1;
                        } else {
                            details.column++;
                        }

                        p++;
                    }

                    peg$posDetailsCache[pos] = details;
                    return details;
                }
            }

            function peg$computeLocation(startPos, endPos) {
                var startPosDetails = peg$computePosDetails(startPos),
                    endPosDetails   = peg$computePosDetails(endPos);

                return {
                    start: {
                        offset: startPos,
                        line:   startPosDetails.line,
                        column: startPosDetails.column
                    },
                    end: {
                        offset: endPos,
                        line:   endPosDetails.line,
                        column: endPosDetails.column
                    }
                };
            }

            function peg$fail(expected) {
                if (peg$currPos < peg$maxFailPos) { return; }

                if (peg$currPos > peg$maxFailPos) {
                    peg$maxFailPos = peg$currPos;
                    peg$maxFailExpected = [];
                }

                peg$maxFailExpected.push(expected);
            }

            function peg$buildSimpleError(message, location) {
                return new peg$SyntaxError(message, null, null, location);
            }

            function peg$buildStructuredError(expected, found, location) {
                return new peg$SyntaxError(
                    peg$SyntaxError.buildMessage(expected, found),
                    expected,
                    found,
                    location
                );
            }

            function peg$parseExpression() {
                var s0, s1, s2, s3, s4, s5, s6, s7;

                s0 = peg$currPos;
                s1 = peg$parseFactor();
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    s3 = peg$currPos;
                    s4 = peg$parse_();
                    if (s4 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c0) {
                            s5 = peg$c0;
                            peg$currPos += 2;
                        } else {
                            s5 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c1); }
                        }
                        if (s5 === peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c2) {
                                s5 = peg$c2;
                                peg$currPos += 2;
                            } else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c3); }
                            }
                        }
                        if (s5 !== peg$FAILED) {
                            s6 = peg$parse_();
                            if (s6 !== peg$FAILED) {
                                s7 = peg$parseFactor();
                                if (s7 !== peg$FAILED) {
                                    s4 = [s4, s5, s6, s7];
                                    s3 = s4;
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s3;
                        s3 = peg$FAILED;
                    }
                    while (s3 !== peg$FAILED) {
                        s2.push(s3);
                        s3 = peg$currPos;
                        s4 = peg$parse_();
                        if (s4 !== peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c0) {
                                s5 = peg$c0;
                                peg$currPos += 2;
                            } else {
                                s5 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c1); }
                            }
                            if (s5 === peg$FAILED) {
                                if (input.substr(peg$currPos, 2) === peg$c2) {
                                    s5 = peg$c2;
                                    peg$currPos += 2;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c3); }
                                }
                            }
                            if (s5 !== peg$FAILED) {
                                s6 = peg$parse_();
                                if (s6 !== peg$FAILED) {
                                    s7 = peg$parseFactor();
                                    if (s7 !== peg$FAILED) {
                                        s4 = [s4, s5, s6, s7];
                                        s3 = s4;
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c4(s1, s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseFactor() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 40) {
                    s1 = peg$c5;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c6); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        s3 = peg$parseExpression();
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 41) {
                                    s5 = peg$c7;
                                    peg$currPos++;
                                } else {
                                    s5 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c8); }
                                }
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c9(s3);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$parseCondition();
                }

                return s0;
            }

            function peg$parseCondition() {
                var s0, s1, s2, s3, s4, s5;

                s0 = peg$currPos;
                s1 = peg$parseToken();
                if (s1 !== peg$FAILED) {
                    s2 = peg$parse_();
                    if (s2 !== peg$FAILED) {
                        if (input.substr(peg$currPos, 2) === peg$c10) {
                            s3 = peg$c10;
                            peg$currPos += 2;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c11); }
                        }
                        if (s3 === peg$FAILED) {
                            if (input.substr(peg$currPos, 2) === peg$c12) {
                                s3 = peg$c12;
                                peg$currPos += 2;
                            } else {
                                s3 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c13); }
                            }
                            if (s3 === peg$FAILED) {
                                if (input.charCodeAt(peg$currPos) === 62) {
                                    s3 = peg$c14;
                                    peg$currPos++;
                                } else {
                                    s3 = peg$FAILED;
                                    if (peg$silentFails === 0) { peg$fail(peg$c15); }
                                }
                                if (s3 === peg$FAILED) {
                                    if (input.charCodeAt(peg$currPos) === 60) {
                                        s3 = peg$c16;
                                        peg$currPos++;
                                    } else {
                                        s3 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c17); }
                                    }
                                    if (s3 === peg$FAILED) {
                                        if (input.substr(peg$currPos, 7) === peg$c18) {
                                            s3 = peg$c18;
                                            peg$currPos += 7;
                                        } else {
                                            s3 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c19); }
                                        }
                                    }
                                }
                            }
                        }
                        if (s3 !== peg$FAILED) {
                            s4 = peg$parse_();
                            if (s4 !== peg$FAILED) {
                                s5 = peg$parseToken();
                                if (s5 !== peg$FAILED) {
                                    peg$savedPos = s0;
                                    s1 = peg$c20(s1, s3, s5);
                                    s0 = s1;
                                } else {
                                    peg$currPos = s0;
                                    s0 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseToken() {
                var s0, s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11;

                s0 = peg$currPos;
                s1 = peg$parsePropertyAccess();
                if (s1 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 40) {
                        s2 = peg$c5;
                        peg$currPos++;
                    } else {
                        s2 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c6); }
                    }
                    if (s2 !== peg$FAILED) {
                        s3 = peg$currPos;
                        s4 = peg$parse_();
                        if (s4 !== peg$FAILED) {
                            s5 = peg$parseToken();
                            if (s5 !== peg$FAILED) {
                                s6 = peg$parse_();
                                if (s6 !== peg$FAILED) {
                                    s7 = [];
                                    s8 = peg$currPos;
                                    if (input.charCodeAt(peg$currPos) === 44) {
                                        s9 = peg$c21;
                                        peg$currPos++;
                                    } else {
                                        s9 = peg$FAILED;
                                        if (peg$silentFails === 0) { peg$fail(peg$c22); }
                                    }
                                    if (s9 !== peg$FAILED) {
                                        s10 = peg$parse_();
                                        if (s10 !== peg$FAILED) {
                                            s11 = peg$parseToken();
                                            if (s11 !== peg$FAILED) {
                                                s9 = [s9, s10, s11];
                                                s8 = s9;
                                            } else {
                                                peg$currPos = s8;
                                                s8 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s8;
                                        s8 = peg$FAILED;
                                    }
                                    while (s8 !== peg$FAILED) {
                                        s7.push(s8);
                                        s8 = peg$currPos;
                                        if (input.charCodeAt(peg$currPos) === 44) {
                                            s9 = peg$c21;
                                            peg$currPos++;
                                        } else {
                                            s9 = peg$FAILED;
                                            if (peg$silentFails === 0) { peg$fail(peg$c22); }
                                        }
                                        if (s9 !== peg$FAILED) {
                                            s10 = peg$parse_();
                                            if (s10 !== peg$FAILED) {
                                                s11 = peg$parseToken();
                                                if (s11 !== peg$FAILED) {
                                                    s9 = [s9, s10, s11];
                                                    s8 = s9;
                                                } else {
                                                    peg$currPos = s8;
                                                    s8 = peg$FAILED;
                                                }
                                            } else {
                                                peg$currPos = s8;
                                                s8 = peg$FAILED;
                                            }
                                        } else {
                                            peg$currPos = s8;
                                            s8 = peg$FAILED;
                                        }
                                    }
                                    if (s7 !== peg$FAILED) {
                                        s8 = peg$parse_();
                                        if (s8 !== peg$FAILED) {
                                            s4 = [s4, s5, s6, s7, s8];
                                            s3 = s4;
                                        } else {
                                            peg$currPos = s3;
                                            s3 = peg$FAILED;
                                        }
                                    } else {
                                        peg$currPos = s3;
                                        s3 = peg$FAILED;
                                    }
                                } else {
                                    peg$currPos = s3;
                                    s3 = peg$FAILED;
                                }
                            } else {
                                peg$currPos = s3;
                                s3 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s3;
                            s3 = peg$FAILED;
                        }
                        if (s3 === peg$FAILED) {
                            s3 = null;
                        }
                        if (s3 !== peg$FAILED) {
                            if (input.charCodeAt(peg$currPos) === 41) {
                                s4 = peg$c7;
                                peg$currPos++;
                            } else {
                                s4 = peg$FAILED;
                                if (peg$silentFails === 0) { peg$fail(peg$c8); }
                            }
                            if (s4 !== peg$FAILED) {
                                peg$savedPos = s0;
                                s1 = peg$c23(s1, s3);
                                s0 = s1;
                            } else {
                                peg$currPos = s0;
                                s0 = peg$FAILED;
                            }
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                if (s0 === peg$FAILED) {
                    s0 = peg$parsePropertyAccess();
                    if (s0 === peg$FAILED) {
                        s0 = peg$parseStringLiteral();
                        if (s0 === peg$FAILED) {
                            s0 = peg$parseNumber();
                        }
                    }
                }

                return s0;
            }

            function peg$parsePropertyAccess() {
                var s0, s1, s2, s3;

                s0 = peg$currPos;
                s1 = peg$parseString();
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    s3 = peg$parseSubProperty();
                    while (s3 !== peg$FAILED) {
                        s2.push(s3);
                        s3 = peg$parseSubProperty();
                    }
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c24(s1, s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseSubProperty() {
                var s0, s1, s2;

                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 46) {
                    s1 = peg$c25;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c26); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = peg$parseString();
                    if (s2 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c27(s2);
                        s0 = s1;
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }

                return s0;
            }

            function peg$parseNumber() {
                var s0, s1, s2;

                s0 = peg$currPos;
                s1 = [];
                if (peg$c28.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c29); }
                }
                if (s2 !== peg$FAILED) {
                    while (s2 !== peg$FAILED) {
                        s1.push(s2);
                        if (peg$c28.test(input.charAt(peg$currPos))) {
                            s2 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s2 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c29); }
                        }
                    }
                } else {
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c30(s1);
                }
                s0 = s1;

                return s0;
            }

            function peg$parseString() {
                var s0, s1, s2, s3, s4;

                s0 = peg$currPos;
                s1 = peg$currPos;
                if (peg$c31.test(input.charAt(peg$currPos))) {
                    s2 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s2 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c32); }
                }
                if (s2 !== peg$FAILED) {
                    s3 = [];
                    if (peg$c33.test(input.charAt(peg$currPos))) {
                        s4 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s4 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c34); }
                    }
                    while (s4 !== peg$FAILED) {
                        s3.push(s4);
                        if (peg$c33.test(input.charAt(peg$currPos))) {
                            s4 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s4 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c34); }
                        }
                    }
                    if (s3 !== peg$FAILED) {
                        s2 = [s2, s3];
                        s1 = s2;
                    } else {
                        peg$currPos = s1;
                        s1 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s1;
                    s1 = peg$FAILED;
                }
                if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c35(s1);
                }
                s0 = s1;

                return s0;
            }

            function peg$parseStringLiteral() {
                var s0, s1, s2, s3;

                peg$silentFails++;
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 34) {
                    s1 = peg$c37;
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c38); }
                }
                if (s1 !== peg$FAILED) {
                    s2 = [];
                    if (peg$c39.test(input.charAt(peg$currPos))) {
                        s3 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s3 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c40); }
                    }
                    while (s3 !== peg$FAILED) {
                        s2.push(s3);
                        if (peg$c39.test(input.charAt(peg$currPos))) {
                            s3 = input.charAt(peg$currPos);
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c40); }
                        }
                    }
                    if (s2 !== peg$FAILED) {
                        if (input.charCodeAt(peg$currPos) === 34) {
                            s3 = peg$c37;
                            peg$currPos++;
                        } else {
                            s3 = peg$FAILED;
                            if (peg$silentFails === 0) { peg$fail(peg$c38); }
                        }
                        if (s3 !== peg$FAILED) {
                            peg$savedPos = s0;
                            s1 = peg$c41(s2);
                            s0 = s1;
                        } else {
                            peg$currPos = s0;
                            s0 = peg$FAILED;
                        }
                    } else {
                        peg$currPos = s0;
                        s0 = peg$FAILED;
                    }
                } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c36); }
                }

                return s0;
            }

            function peg$parse_() {
                var s0, s1;

                peg$silentFails++;
                s0 = [];
                if (peg$c43.test(input.charAt(peg$currPos))) {
                    s1 = input.charAt(peg$currPos);
                    peg$currPos++;
                } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c44); }
                }
                while (s1 !== peg$FAILED) {
                    s0.push(s1);
                    if (peg$c43.test(input.charAt(peg$currPos))) {
                        s1 = input.charAt(peg$currPos);
                        peg$currPos++;
                    } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) { peg$fail(peg$c44); }
                    }
                }
                peg$silentFails--;
                if (s0 === peg$FAILED) {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) { peg$fail(peg$c42); }
                }

                return s0;
            }


            /*  AQUI VAN LAS OPTIONS  */


            function resolveProperty(obj,subProps)
            {
                var root=globalOptions.properties[obj];
                var i=0;
                while(i<subProps.length && typeof root!="undefined")
                    root=root[subProps[i++]];
                return root;
            }
            function parseCondition(left,operand,right)
            {
                switch(operand)
                {
                    case "==":{return left==right;}break;
                    case "!=":{return left != right;}break;
                    case ">":{return parseInt(left)>parseInt(right);}break;
                    case "<":{return parseInt(left)<parseInt(right);}break;
                    case "matches":{var r=new RegExp(right);return r.test(left);}
                }
            }
            function parseBoolean(left,more)
            {
                var l=left;
                for(var i=0;i<more.length;i++)
                {
                    var c=more[i];
                    switch(c[1])
                    {
                        case "||":{l=( l || c[3])}break;
                        case "&&":{l=( l && c[3])}break;
                    }
                }
                return l;
            }
            console.log("INIT");


            peg$result = peg$startRuleFunction();

            if (peg$result !== peg$FAILED && peg$currPos === input.length) {
                return peg$result;
            } else {
                if (peg$result !== peg$FAILED && peg$currPos < input.length) {
                    peg$fail(peg$endExpectation());
                }

                throw peg$buildStructuredError(
                    peg$maxFailExpected,
                    peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
                    peg$maxFailPos < input.length
                        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
                        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
                );
            }
        }

        return {
            SyntaxError: peg$SyntaxError,
            parse:       peg$parse
        };
    })();


/***/ }),

/***/ "./src/lib/Service/Service.js":
/*!************************************!*\
  !*** ./src/lib/Service/Service.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Service; });
/* harmony import */ var _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Arch/Promised */ "./src/lib/Arch/Promised.js");
/* harmony import */ var _Browser_UUID__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Browser/UUID */ "./src/lib/Browser/UUID.js");


class Service extends _Arch_Promised__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(serviceContainer,config) {
        super();
        this.serviceContainer=serviceContainer;
        this.config=config;
        this.logger=serviceContainer.get("Log");
    }
    initialize()
    {
        this.run(["Configured","Ready"]);
    }
    onConfigured(){}
    onReady(){}
    getService(name)
    {
        return this.serviceContainer.get(name);
    }
    findService(name)
    {
        return this.serviceContainer.get(name);
    }
    getContainer()
    {
        return this.serviceContainer;
    }
}

/***/ }),

/***/ "./src/lib/Service/ServiceContainer.js":
/*!*********************************************!*\
  !*** ./src/lib/Service/ServiceContainer.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServiceContainer; });
/** SERVICECONTAINER_IMPORTS **/
class ServiceContainer
{
    constructor(serviceSpec)
    {
        this.spec=serviceSpec;
        this.services={};

    }
    initialize()
    {
        /** SERVICECONTAINER_INITIALIZE **/
    }
    // serviceList esta en la forma: {"<nombre servicio>":{instance:<Modulo importado>,config:{...}}
    loadServices(serviceList)
    {
        for(let k in serviceList)
        {
            this.services[k]=new (serviceList[k].instance)(this,serviceList[k].config);
        }
        for(let k in this.services)
        {
            this.services[k].initialize();
        }
    }
    get(serviceName)
    {
        if(typeof this.services[serviceName] === undefined)
            throw "Unknown service :"+serviceName;
        return this.services[serviceName];
    }
    add(serviceName,service)
    {
        this.services[serviceName]=service;
    }
}

/***/ })

/******/ });
//# sourceMappingURL=PageManager.js.map