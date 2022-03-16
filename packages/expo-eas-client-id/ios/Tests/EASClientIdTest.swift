//  Copyright (c) 2020 650 Industries, Inc. All rights reserved.

import XCTest

@testable import EASClientId

class EASClientIdTests : XCTestCase {
  func testCreatesStableUUID() throws {
    let easClientId = EASClientId.uuid.uuidString
    XCTAssertNotNil(easClientId)

    let easClientId2 = EASClientId.uuid.uuidString
    XCTAssertEqual(easClientId, easClientId2)
  }
}
