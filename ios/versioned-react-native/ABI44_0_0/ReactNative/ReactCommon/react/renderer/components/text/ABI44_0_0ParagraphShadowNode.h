/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#pragma once

#include <folly/Optional.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/ParagraphEventEmitter.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/ParagraphProps.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/ParagraphState.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/text/TextShadowNode.h>
#include <ABI44_0_0React/ABI44_0_0renderer/components/view/ConcreteViewShadowNode.h>
#include <ABI44_0_0React/ABI44_0_0renderer/core/ConcreteShadowNode.h>
#include <ABI44_0_0React/ABI44_0_0renderer/core/LayoutContext.h>
#include <ABI44_0_0React/ABI44_0_0renderer/core/ShadowNode.h>
#include <ABI44_0_0React/ABI44_0_0renderer/textlayoutmanager/TextLayoutManager.h>

namespace ABI44_0_0facebook {
namespace ABI44_0_0React {

extern char const ParagraphComponentName[];

/*
 * `ShadowNode` for <Paragraph> component, represents <View>-like component
 * containing and displaying text. Text content is represented as nested <Text>
 * and <RawText> components.
 */
class ParagraphShadowNode : public ConcreteViewShadowNode<
                                ParagraphComponentName,
                                ParagraphProps,
                                ParagraphEventEmitter,
                                ParagraphState>,
                            public BaseTextShadowNode {
 public:
  using ConcreteViewShadowNode::ConcreteViewShadowNode;

  static ShadowNodeTraits BaseTraits() {
    auto traits = ConcreteViewShadowNode::BaseTraits();
    traits.set(ShadowNodeTraits::Trait::LeafYogaNode);
    traits.set(ShadowNodeTraits::Trait::TextKind);

#ifdef ANDROID
    // Unsetting `FormsStackingContext` trait is essential on Android where we
    // can't mount views inside `TextView`.
    traits.unset(ShadowNodeTraits::Trait::FormsStackingContext);
#endif

    return traits;
  }

  /*
   * Associates a shared TextLayoutManager with the node.
   * `ParagraphShadowNode` uses the manager to measure text content
   * and construct `ParagraphState` objects.
   */
  void setTextLayoutManager(SharedTextLayoutManager textLayoutManager);

#pragma mark - LayoutableShadowNode

  void layout(LayoutContext layoutContext) override;
  Size measureContent(
      LayoutContext const &layoutContext,
      LayoutConstraints const &layoutConstraints) const override;

  /*
   * Internal representation of the nested content of the node in a format
   * suitable for future processing.
   */
  class Content final {
   public:
    AttributedString attributedString;
    ParagraphAttributes paragraphAttributes;
    Attachments attachments;
  };

 private:
  /*
   * Builds (if needed) and returns a reference to a `Content` object.
   */
  Content const &getContent(LayoutContext const &layoutContext) const;

  /*
   * Builds and returns a `Content` object with given `layoutConstraints`.
   */
  Content getContentWithMeasuredAttachments(
      LayoutContext const &layoutContext,
      LayoutConstraints const &layoutConstraints) const;

  /*
   * Creates a `State` object (with `AttributedText` and
   * `TextLayoutManager`) if needed.
   */
  void updateStateIfNeeded(Content const &content);

  SharedTextLayoutManager textLayoutManager_;

  /*
   * Cached content of the subtree started from the node.
   */
  mutable better::optional<Content> content_{};
};

} // namespace ABI44_0_0React
} // namespace ABI44_0_0facebook
